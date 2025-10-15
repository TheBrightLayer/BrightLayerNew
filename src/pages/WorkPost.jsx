// src/pages/WorkPost.jsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { postsMeta } from "../data/postsIndex";
import PostLayout from "../components/PostLayout";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function WorkPost() {
  const { slug } = useParams();
  const localMeta = postsMeta.find((p) => p.slug === slug);
  const [LocalComponent, setLocalComponent] = useState(null);
  const [remotePost, setRemotePost] = useState(null);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [errorRemote, setErrorRemote] = useState(null);
  const [errorLocal, setErrorLocal] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLocalComponent(null);
    setErrorLocal(null);

    if (!localMeta) return;
    import(`../content/${slug}.jsx`)
      .then((mod) => {
        if (mounted) setLocalComponent(() => mod.default);
      })
      .catch((err) => {
        console.error("Error loading local post component:", err);
        if (mounted) setErrorLocal(err);
      });

    return () => {
      mounted = false;
    };
  }, [slug, localMeta]);

  useEffect(() => {
    let mounted = true;
    if (localMeta) return;
    if (!slug) {
      setErrorRemote("Missing slug in URL");
      return;
    }

    setLoadingRemote(true);
    setErrorRemote(null);
    setRemotePost(null);

    const controller = new AbortController();
    const fetchPost = async () => {
      try {
        const url = `${API_BASE.replace(/\/$/, "")}/api/blogs/${encodeURIComponent(slug)}`;
        const res = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        const blogObj = data?.blog ?? data?.data ?? data;
        if (mounted) setRemotePost(blogObj);
      } catch (err) {
        if (mounted) setErrorRemote(err.message || "Failed to fetch post");
      } finally {
        if (mounted) setLoadingRemote(false);
      }
    };

    fetchPost();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [slug, localMeta]);

  // ---------- content rendering helpers ----------
  const tryParseJSON = (maybeJson) => {
    if (typeof maybeJson !== "string") return maybeJson;
    try {
      return JSON.parse(maybeJson);
    } catch {
      return maybeJson;
    }
  };

  // render portable / block content (simple)
  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null;

    // We want to convert an array of blocks to JSX
    return blocks.map((block, i) => {
      if (!block) return null;

      // plain string
      if (typeof block === "string") {
        return (
          <p key={i} className="mb-4 text-gray-300 leading-relaxed">
            {block}
          </p>
        );
      }

      // Sanity-like / portable text: block._type === 'block' or block.type === 'paragraph'
      const type = block._type ?? block.type ?? null;

      // Paragraph-like
      if (type === "block" || type === "paragraph" || block.style === "normal") {
        const children = block.children ?? (block.text ? [{ text: block.text }] : []);
        const content = (children || []).map((ch, idx) => {
          const text = ch?.text ?? "";
          if (ch?.marks && Array.isArray(ch.marks) && ch.marks.length) {
            // naive mark handling
            let node = text;
            if (ch.marks.includes("strong") || ch.marks.includes("bold")) node = <strong key={idx}>{node}</strong>;
            if (ch.marks.includes("em") || ch.marks.includes("italic")) node = <em key={idx}>{node}</em>;
            return <span key={idx}>{node}</span>;
          }
          return <span key={idx}>{text}</span>;
        });

        return (
          <p key={i} className="mb-4 text-gray-300 leading-relaxed">
            {content}
          </p>
        );
      }

      // Headings
      if (block.style === "h2" || (type === "heading" && block.level === 2)) {
        const text = block.children?.map((c) => c.text).join("") ?? block.text ?? "";
        return (
          <h2 key={i} className="text-[#00FF84] uppercase font-bold text-xl mt-12 mb-4">
            {text}
          </h2>
        );
      }
      if (block.style === "h3" || (type === "heading" && block.level === 3)) {
        const text = block.children?.map((c) => c.text).join("") ?? block.text ?? "";
        return (
          <h3 key={i} className="text-white text-xl mt-8 mb-3">
            {text}
          </h3>
        );
      }

      // lists: either block.listItem true or block._type === 'list'
      if (block.listItem || block._type === "list" || block.style === "ul" || block.style === "ol") {
        // Attempt to normalize into items array
        const items = block.items ?? (block.children ? block.children : (block.list ?? null));
        if (Array.isArray(items)) {
          // assume unordered for portability
          return (
            <ul key={i} className="list-disc ml-6 mb-4 text-gray-300">
              {items.map((li, j) => {
                const liText = li?.children?.map((c) => c.text).join("") ?? li?.text ?? String(li);
                return <li key={j}>{liText}</li>;
              })}
            </ul>
          );
        }
        // fallback - single listItem block that contains text
        if (block.children) {
          const text = block.children.map((c) => c.text).join("");
          return (
            <ul key={i} className="list-disc ml-6 mb-4 text-gray-300">
              <li>{text}</li>
            </ul>
          );
        }
      }

      // Fallback: render text field or JSON string
      const fallback = block.text ?? block.children?.map((c) => c.text).join("") ?? JSON.stringify(block);
      return (
        <p key={i} className="mb-4 text-gray-300 leading-relaxed">
          {fallback}
        </p>
      );
    });
  };

  const renderContentNode = (raw) => {
    if (raw == null) return null;
    const parsed = tryParseJSON(raw);

    // if it's an HTML string
    if (typeof parsed === "string" && parsed.trim().startsWith("<")) {
      return <div className="prose prose-invert max-w-none [&>h2]:text-[#00FF84] [&>h2]:uppercase">{/* sanitize upstream */} <div dangerouslySetInnerHTML={{ __html: parsed }} /></div>;
    }

    // if it's array of blocks
    if (Array.isArray(parsed)) {
      return <div className="max-w-none">{renderBlocks(parsed)}</div>;
    }

    // if object that contains blocks under 'blocks' or 'content'
    if (typeof parsed === "object") {
      const blocks = parsed.blocks ?? parsed.content ?? parsed.body ?? null;
      if (Array.isArray(blocks)) return <div className="max-w-none">{renderBlocks(blocks)}</div>;
      // object with raw text
      const text = parsed.text ?? parsed.html ?? parsed.body ?? null;
      if (typeof text === "string") return <div className="text-gray-300">{text}</div>;
    }

    // last resort: primitive string
    if (typeof raw === "string") {
      return <div className="text-gray-300 whitespace-pre-wrap">{raw}</div>;
    }

    return null;
  };

  // ---------- render remote wrapped in PostLayout ----------
  const renderRemoteContent = (post) => {
    const raw = post.content ?? post.html ?? post.body ?? post.bodyHtml ?? null;
    const title = post.title ?? post.heading ?? post.name ?? slug;
    const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : post.date ?? null;
    const cover = post.coverImage ?? post.imageUrl ?? post.mainImage ?? post.cover ?? null;
    const subtitle = post.client ?? post.brand ?? null;

    return (
      <PostLayout title={title} subtitle={subtitle} cover={cover}>
        {/* optional date */}
        {date && <p className="text-sm text-gray-500 mb-2">{date}</p>}

        {/* Render the content (blocks / html / text) */}
        {renderContentNode(raw) ?? (
          <>
            {post.excerpt && <p className="mb-4 text-gray-300">{post.excerpt}</p>}
            {post.body && <div className="whitespace-pre-wrap text-gray-300">{post.body}</div>}
          </>
        )}
      </PostLayout>
    );
  };

  // ---------- page render ----------
  const nothingFound = !localMeta && !remotePost && !loadingRemote;

  return (
    <>
      {/* LOCAL META path */}
      {localMeta && (
        <>
          {/* If local component exists, render it (most of your local posts should already use PostLayout) */}
          {LocalComponent ? (
            <Suspense fallback={<div className="bg-black text-white min-h-screen py-40 text-center">Loading…</div>}>
              <LocalComponent />
            </Suspense>
          ) : (
            // Fallback content when meta exists but no local component
            <PostLayout title={localMeta.title} subtitle={localMeta.client ?? localMeta.subtitle} cover={localMeta.cover ?? localMeta.image}>
              {errorLocal ? (
                <p className="text-red-400">Could not load local post component.</p>
              ) : (
                <p className="text-gray-300">Content for this post is not available locally.</p>
              )}
            </PostLayout>
          )}
        </>
      )}

      {/* REMOTE path */}
      {!localMeta && loadingRemote && (
        <div className="bg-black text-white py-32 text-center">Loading post…</div>
      )}

      {!localMeta && errorRemote && (
        <div className="bg-black text-white py-20 text-center">
          <p className="text-red-400 mb-4">{errorRemote}</p>
       
        </div>
      )}

      {!localMeta && remotePost && renderRemoteContent(remotePost)}

      {nothingFound && (
        <div className="bg-black text-white py-12 text-center">
          <h2 className="text-xl font-bold">Not found</h2>
          <p className="text-sm text-gray-500 mb-4">No local post and could not find a remote blog for <strong>{slug}</strong>.</p>
          <Link to="/work" className="text-[#00FF84] underline">← Back to work</Link>
        </div>
      )}
    </>
  );
}
