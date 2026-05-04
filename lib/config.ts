export type Project = {
  name: string;
  /** Full URL including https:// */
  url: string;
  blurb: string;
};

/** Open Graph image for `targetUrl`, served via Microlink’s image proxy (social-style preview). */
export function linkPreviewImage(targetUrl: string): string {
  const params = new URLSearchParams({
    url: targetUrl,
    meta: "false",
    embed: "image.url",
  });
  return `https://i.microlink.io/https://api.microlink.io/?${params.toString()}`;
}

export const siteConfig = {
  name: "Will / Liam",
  portraitUrl:
    "https://framerusercontent.com/images/jylWLzhY0dUju3tcTMfBwpv4cVw.jpg?width=1066&height=1066",
  portraitAlt: "Will / Liam performing stand-up",
  bio: `Hey, I'm Will/Liam depending on who you ask. I build a lot of stuff during the day, and I'm a comedian and comedy club owner at night. Check out some of my stuff.`,
  contactEmail: "will@slatermarketing.co.uk",
  projects: [
    {
      name: "Iguana Comedy",
      url: "https://iguanacomedy.com",
      blurb: "The comedy club — shows, community, and late nights.",
    },
    {
      name: "Kintana",
      url: "https://kintana.app",
      blurb: "An app I’m building — tools and workflows I care about.",
    },
    {
      name: "Dinabite",
      url: "https://dinabite.ai",
      blurb: "AI product work — experimenting with what’s useful.",
    },
    {
      name: "Liam Slater",
      url: "https://liamslater.com",
      blurb: "My personal site — more links and context.",
    },
  ] satisfies Project[],
} as const;
