export type Project = {
  name: string;
  /** Full URL including https:// */
  url: string;
  blurb: string;
};

export const siteConfig = {
  name: "Will Slater",
  /** Shown under the hero — edit to match your voice */
  bio: `I run Slater Marketing and keep a few ideas cooking on the side. This domain is parked while I get to it — but I usually already know what I want to do with it.`,
  contactEmail: "will@slatermarketing.co.uk",
  /**
   * Update this list anytime; one git push updates every domain
   * hooked to the same Cloudflare Pages project.
   */
  projects: [
    {
      name: "Slater Marketing",
      url: "https://slatermarketing.co.uk",
      blurb: "Marketing and growth work — that’s the day job.",
    },
    {
      name: "Your next project",
      url: "https://example.com",
      blurb: "Swap these placeholders for real links in lib/config.ts.",
    },
  ] satisfies Project[],
} as const;
