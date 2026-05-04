import type { MetadataRoute } from "next";

/** Required for `output: "export"` — see https://nextjs.org/docs/app/building-your-application/deploying/static-exports */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
