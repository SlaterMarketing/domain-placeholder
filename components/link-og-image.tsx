"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type MicrolinkPayload = {
  status?: string;
  data?: {
    image?: { url?: string };
    screenshot?: { url?: string };
  };
};

type Props = {
  pageUrl: string;
  alt: string;
  className?: string;
};

/**
 * Loads each site’s Open Graph image (or Microlink screenshot) via the public
 * JSON API, then renders a normal <img>. The old `i.microlink.io/...embed=image.url`
 * shortcut often 403s or breaks behind CDNs; this path matches what Microlink’s
 * own UI uses.
 */
export function LinkOgImage({ pageUrl, alt, className }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setSrc(null);
    setDone(false);
    setLoadError(false);
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        const api = new URL("https://api.microlink.io/");
        api.searchParams.set("url", pageUrl);
        api.searchParams.set("screenshot", "true");

        const res = await fetch(api.toString(), {
          signal: ac.signal,
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error(`microlink ${res.status}`);
        const json = (await res.json()) as MicrolinkPayload;
        const u =
          json?.data?.image?.url?.trim() ||
          trimUrlOrEmpty(json?.data?.screenshot?.url);
        if (!cancelled) {
          if (u) setSrc(u);
          setDone(true);
        }
      } catch {
        if (!cancelled) setDone(true);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [pageUrl]);

  const showImage = Boolean(src) && !loadError;

  return (
    <>
      {!done && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-muted"
        />
      )}
      {done && !showImage && (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-muted px-4 text-center text-xs text-muted-foreground"
        >
          No preview for this site
        </div>
      )}
      {showImage ? (
        <img
          src={src!}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={() => setLoadError(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]",
            className,
          )}
        />
      ) : null}
    </>
  );
}

function trimUrlOrEmpty(s?: string): string | null {
  const t = s?.trim();
  return t || null;
}
