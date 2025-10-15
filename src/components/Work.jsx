import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ArrowRight } from "lucide-react";
import about from "../assets/hero.png";
import SkeletonLoader from "../components/skeletonLoader";

/**
 * Work.jsx
 * - Fetches from /api/blogs (REACT_APP_API_URL || http://localhost:5000)
 * - Normalizes items and ensures each has a `slug` (server-provided or generated)
 * - Navigates to /work/:slug when card/button clicked
 *
 * Improvements:
 * - more tolerant JSON parsing (handles stray text)
 * - better logging for debugging
 * - only show error message when there's no data to display
 */

const DEFAULT_BASE = "https://thebrightlayerbackend.onrender.com" || "http://localhost:5000";

// ---------------- helpers ----------------
const unique = (arr) => Array.from(new Set(arr));

const slugify = (text = "") =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\_]+/g, "-") // spaces -> -
    .replace(/[^a-z0-9\-]/g, "") // remove invalid chars
    .replace(/\-+/g, "-") // collapse dashes
    .replace(/^\-+|\-+$/g, ""); // trim dashes

const resolveImageUrl = (rawUrl, base) => {
  if (!rawUrl) return null;
  if (/^data:|^blob:|^https?:\/\//i.test(rawUrl)) return rawUrl;
  const b = base.replace(/\/+$/, "");
  const p = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return `${b}${p}`;
};

// ---------------- Card ----------------
const Card = ({ item, onClick }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="group relative rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/5 hover:ring-white/10"
    aria-labelledby={`work-${item.id}-title`}
    onClick={() => onClick(item.slug)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? onClick(item.slug) : null)}
  >
    <div className="aspect-[16/10] w-full bg-zinc-800">
      <img
        src={item.imageUrlResolved || item.imageUrl || about}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 pointer-events-none" />

    <div className="p-5 md:p-6 relative z-10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 font-semibold">
          {item.category}
        </div>
        <div className="text-white/80 text-xs sm:text-sm">{item.year}</div>
      </div>

      <h4 id={`work-${item.id}-title`} className="mt-2 text-lg md:text-xl font-bold leading-snug text-white">
        {item.title}
      </h4>
      <p className="mt-1 text-sm text-white/70">{item.client}</p>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(item.slug);
          }}
          className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-white/20 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          aria-label={`Open post ${item.title}`}>
          View case study <ArrowRight size={16} className="translate-x-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </motion.article>
);

// ---------------- Component ----------------
export default function Work() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [sort, setSort] = React.useState("Newest");
  const [visible, setVisible] = React.useState(9);

  const [items, setItems] = React.useState([]); // no fallback items
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // compute categories/years from items
  const ALL_ITEMS = items;
  const categories = React.useMemo(() => ["All", ...unique(ALL_ITEMS.map((i) => i.category))], [ALL_ITEMS]);
  const years = React.useMemo(() => unique(ALL_ITEMS.map((i) => i.year)).sort((a, b) => b - a), [ALL_ITEMS]);

  // Navigate to the post route using slug
  const openPost = (slug) => {
    if (!slug) return;
    navigate(`/work/${slug}`);
  };

  // fetch from server (only /api/blogs) — robust parsing + helpful logging
  React.useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      const base = DEFAULT_BASE.replace(/\/$/, "");
      const url = `${base}/api/blogs`;

      try {
        const res = await fetch(url, { signal: ac.signal, headers: { Accept: "application/json" } });

        // debugging info:
        console.log("[Work] fetch", { url, status: res.status, ok: res.ok });
        try {
          const ct = res.headers.get("content-type");
          if (ct) console.log("[Work] content-type:", ct);
        } catch (_) {}

        const text = await res.text();

        // try normal parse; if parse fails attempt to extract JSON-like substring
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (parseErr) {
          console.warn("[Work] JSON.parse failed — attempting tolerant parse:", parseErr);
          // attempt to find the first JSON object/array inside the returned text
          const firstBrace = text.indexOf("{");
          const firstBracket = text.indexOf("[");
          if (firstBracket !== -1) {
            const lastBracket = text.lastIndexOf("]");
            if (lastBracket > firstBracket) {
              try {
                parsed = JSON.parse(text.substring(firstBracket, lastBracket + 1));
              } catch (e) {
                // ignore
                parsed = null;
              }
            }
          } else if (firstBrace !== -1) {
            const lastBrace = text.lastIndexOf("}");
            if (lastBrace > firstBrace) {
              try {
                parsed = JSON.parse(text.substring(firstBrace, lastBrace + 1));
              } catch (e) {
                parsed = null;
              }
            }
          }
        }

        // if response status indicates error, log the body
        if (!res.ok) {
          console.error("[Work] server returned non-OK status", res.status, text);
          // If parsed is null or not array, we'll treat as error below.
        }

        const got = Array.isArray(parsed)
          ? parsed
          : parsed && Array.isArray(parsed.blogs)
          ? parsed.blogs
          : parsed && Array.isArray(parsed.data)
          ? parsed.data
          : null;

        if (Array.isArray(got) && got.length > 0) {
          const normalized = got.map((it, idx) => {
            const rawSlug = it.slug ?? it._slug ?? null;
            const slug = rawSlug ? String(rawSlug) : slugify(it.title ?? `post-${idx}`);
            const rawImage = it.mainImage ?? it.imageUrl ?? it.cover ?? it.coverImage ?? null;
            return {
              id: it.id ?? it._id ?? `srv-${idx}`,
              _id: it._id ?? it.id ?? `srv-${idx}`,
              title: it.title ?? it.heading ?? "Untitled",
              client: it.client ?? it.author ?? "",
              category: it.category ?? it.tags?.[0] ?? "Uncategorized",
              year: it.year ?? (it.publishedAt ? new Date(it.publishedAt).getFullYear() : new Date().getFullYear()),
              slug,
              imageUrl: rawImage,
              imageUrlResolved: resolveImageUrl(rawImage, DEFAULT_BASE) || about,
              __raw: it,
            };
          });

          setItems(normalized);
          setError(null); // clear any previous error now that we have data
        } else {
          console.warn("[Work] Unexpected response shape or empty data:", parsed);
          // If we already have items from a previous fetch, prefer showing them.
          if (items.length === 0) {
            //tError("Could not load case studies from server.");
          } else {
            // keep existing items, but don't show the error overlay
            setError(null);
          }
        }
      } catch (err) {
        console.error("Failed fetching /api/blogs:", err);
        // show the red message only if there is no data to display
        if (items.length === 0) {
          <SkeletonLoader/>
         // setError("Could not load case studies from server.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  const filtered = React.useMemo(() => {
    let list = [...ALL_ITEMS];
    if (category !== "All") list = list.filter((i) => i.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          (i.title || "").toLowerCase().includes(q) ||
          (i.client || "").toLowerCase().includes(q) ||
          (i.category || "").toLowerCase().includes(q) ||
          (i.slug || "").toLowerCase().includes(q)
      );
    }
    if (sort === "Newest") list.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sort === "A–Z") list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return list;
  }, [category, query, sort, ALL_ITEMS]);

  const FEATURED = ALL_ITEMS.slice(0, 6);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Page header */}
      <header className="px-6 md:px-8 pt-20 md:pt-24 pb-6 border-b border-white/10 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-emerald-400 font-semibold text-xs uppercase tracking-widest">Featured work</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">Selected Case Studies</h1>
              <p className="mt-3 text-white/70 max-w-2xl text-sm md:text-base">
                A curated selection of recent projects across categories. Click any card to open the full post.
              </p>
            </div>
            <Link to="/work" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium underline text-white/90 hover:text-white">
              View all work
            </Link>
          </div>
        </div>
      </header>

      {/* small status */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 mt-6">
        {loading && <div className="text-sm text-white/70">Loading case studies…</div>}
        {error && <div className="text-sm text-rose-400">{error}</div>}
      </div>



      {/* Archive & Controls */}
      <section className="px-6 md:px-8 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
            <h2 className="text-xl md:text-2xl font-bold">All work</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full md:w-auto">
              <label className="relative flex items-center bg-zinc-900/60 ring-1 ring-white/10 rounded-2xl px-3 py-2">
                <Search size={16} className="mr-2 shrink-0 opacity-70" />
                <input type="search" placeholder="Search by title, client, category or slug" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent outline-none w-full text-sm placeholder-white/50" aria-label="Search case studies" />
              </label>

              <div className="relative">
                <div className="flex items-center bg-zinc-900/60 ring-1 ring-white/10 rounded-2xl px-3 py-2">
                  <Filter size={16} className="mr-2 shrink-0 opacity-70" />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent outline-none text-sm w-full appearance-none pr-6" aria-label="Filter by category">
                    {categories.map((c) => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 opacity-70 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center bg-zinc-900/60 ring-1 ring-white/10 rounded-2xl px-3 py-2">
                  <span className="mr-2 text-xs uppercase tracking-wide text-white/60">Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none text-sm w-full appearance-none pr-6" aria-label="Sort case studies">
                    <option value="Newest" className="bg-zinc-900">Newest</option>
                    <option value="A–Z" className="bg-zinc-900">A–Z</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 opacity-70 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Year chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs uppercase tracking-wide text-white/60">Years:</span>
            {years.map((y) => <button key={y} onClick={() => setQuery(String(y))} className="px-3 py-1.5 rounded-full bg-zinc-900/60 ring-1 ring-white/10 text-sm hover:ring-white/20">{y}</button>)}
            <button onClick={() => setQuery("")} className="px-3 py-1.5 rounded-full bg-zinc-900/60 ring-1 ring-white/10 text-sm hover:ring-white/20">Clear</button>
          </div>

          {/* Results grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading
                ? // produce `visible` skeleton items
                  Array.from({ length: visible }).map((_, i) => <SkeletonLoader key={`sk-${i}`} type="small" count={1} />)
                : filtered.slice(0, visible).map((item) => <Card key={item.id} item={item} onClick={openPost} />)}
            </div>
          </AnimatePresence>

          {/* Empty state */}
          {!loading && filtered.length === 0 && <div className="mt-10 text-center text-white/70">No case studies match your filters.</div>}

          {/* Load more */}
          {!loading && visible < filtered.length && (
            <div className="flex justify-center mt-8">
              <button onClick={() => setVisible((v) => v + 9)} className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">Load more</button>
            </div>
          )}
        </div>
      </section>

      <footer className="px-6 md:px-8 pb-10 text-center text-xs text-white/50">© {new Date().getFullYear()} — Work showcase</footer>
    </div>
  );
}
