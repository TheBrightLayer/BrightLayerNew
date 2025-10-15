import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Simple clipboard helper
const copyToClipboard = async (text) => {
  if (!navigator?.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Heuristics:
// - First non-empty line => title
// - Next non-empty short line (<80 chars) => subtitle
// - Blocks separated by blank lines => sections
// - Single-line blocks in ALL CAPS or starting with ## => headings
// - Lists start with -, * or numbered (1.)
// - Images: markdown ![alt](url) or lines starting with IMAGE:
// - Code fences ```lang ... ```
export default function PlainTextToStyled({ text, cover }) {
  const parsed = useMemo(() => {
    if (!text || typeof text !== "string")
      return { title: null, subtitle: null, cover: cover || null, sections: [] };

    const lines = text.split(/\r?\n/).map((l) => l.replace(/\t/g, "").replace(/\s+$/g, ""));
    // title
    let idx = 0;
    while (idx < lines.length && !lines[idx].trim()) idx++;
    const title = lines[idx]?.trim() ?? null;
    idx++;
    // subtitle heuristic
    while (idx < lines.length && !lines[idx].trim()) idx++;
    let subtitle = null;
    if (idx < lines.length && lines[idx].trim().length > 0 && lines[idx].trim().length < 80) {
      subtitle = lines[idx].trim();
      idx++;
    }

    // blocks separated by blank lines
    const rest = lines.slice(idx);
    const blocks = [];
    let buffer = [];
    rest.forEach((ln) => {
      if (!ln.trim()) {
        if (buffer.length) {
          blocks.push(buffer.join("\n"));
          buffer = [];
        }
      } else {
        buffer.push(ln);
      }
    });
    if (buffer.length) blocks.push(buffer.join("\n"));

    const parseBlock = (blk) => {
      const bLines = blk.split(/\n/);

      // markdown image
      const imgMd = blk.match(/^!\[(.*?)\]\((.*?)\)$/m);
      if (imgMd) return { type: "image", src: imgMd[2], alt: imgMd[1] };

      // IMAGE: url
      const imgLine = bLines.find((l) => l.trim().toUpperCase().startsWith("IMAGE:"));
      if (imgLine) {
        const url = imgLine.split(/IMAGE:\s*/i)[1];
        return { type: "image", src: url?.trim(), alt: "" };
      }

      // code fence
      if (blk.trim().startsWith("```")) {
        const m = blk.match(/```(\w+)?\n([\s\S]*?)\n```/);
        if (m) return { type: "code", lang: m[1] ?? "", code: m[2] };
        return { type: "code", lang: "", code: blk };
      }

      // heading detection (single line all-caps or starting with ##)
      if (bLines.length === 1) {
        const single = bLines[0].trim();
        if (/^##+\s*/.test(single)) return { type: "heading", level: single.match(/^##+/)[0].length, text: single.replace(/^##+\s*/, "") };
        if (single === single.toUpperCase() && single.length >= 3 && /[A-Z]/.test(single)) return { type: "heading", level: 2, text: single };
      }

      // lists (all lines start with -, *, or digit.)
      if (bLines.every((l) => /^(-|\*|\d+\.)\s+/.test(l.trim()))) {
        const items = bLines.map((l) => l.replace(/^(-|\*|\d+\.)\s+/, "").trim());
        return { type: "list", ordered: /^\d+\./.test(bLines[0].trim()), items };
      }

      // paragraph
      return { type: "paragraph", text: blk };
    };

    const sections = blocks.map(parseBlock);
    return { title, subtitle, cover: cover || null, sections };
  }, [text, cover]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 text-left">
        <div className="mb-6">
          <Link to="/work" className="inline-block text-sm font-semibold tracking-wide hover:underline" style={{ color: "#00FF84" }}>
            ← BACK TO WORK
          </Link>
        </div>

        <header className="mb-8">
          {parsed.title && (
            <h1 className="font-extrabold leading-tight mb-2" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.02em" }}>
              {parsed.title}
            </h1>
          )}
          {parsed.subtitle && <p className="text-base text-gray-400">{parsed.subtitle}</p>}
        </header>

        {parsed.cover && (
          <div className="mb-12">
            <img src={parsed.cover} alt={parsed.title || "cover"} className="w-full h-[380px] md:h-[480px] object-cover rounded-md shadow-lg" />
          </div>
        )}

        <article className="space-y-12 text-left">
          {parsed.sections.map((s, idx) => {
            if (s.type === "heading") {
              return (
                <section key={idx}>
                  <h2 className="text-[#00FF84] uppercase font-bold text-xl mb-4">{s.text}</h2>
                </section>
              );
            }
            if (s.type === "image") {
              if (!s.src) return null;
              return (
                <div key={idx} className="my-12">
                  <img src={s.src} alt={s.alt || ""} className="w-full object-cover rounded-md shadow-lg" />
                </div>
              );
            }
            if (s.type === "list") {
              return (
                <section key={idx}>
                  <ul className={`ml-6 space-y-2 text-gray-300`} style={{ listStyleType: s.ordered ? "decimal" : "disc" }}>
                    {s.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </section>
              );
            }
            if (s.type === "code") {
              return (
                <div key={idx} className="my-6 max-w-prose">
                  <div className="relative rounded bg-gray-900 border border-gray-800 overflow-auto">
                    <pre className="p-4 whitespace-pre overflow-x-auto text-sm">
                      <code>{s.code}</code>
                    </pre>
                    <div className="absolute right-2 top-2">
                      <button
                        className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs"
                        onClick={async () => {
                          const ok = await copyToClipboard(s.code);
                          if (ok) alert("Copied code to clipboard");
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            // paragraph
            if (s.type === "paragraph") {
              const paras = s.text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
              return (
                <section key={idx}>
                  {paras.map((p, pi) => (
                    <p key={pi} className="text-gray-300 leading-relaxed mb-4 max-w-prose">
                      {p}
                    </p>
                  ))}
                </section>
              );
            }
            return null;
          })}

          <div className="mt-12">
            <Link to="/work" className="inline-block font-semibold hover:underline" style={{ color: "#00FF84" }}>
              ← Back to Work
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
