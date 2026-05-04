"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { linkPreviewImage, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const HOST_PLACEHOLDER = "this domain";

export default function HomePage() {
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    setHost(window.location.hostname || HOST_PLACEHOLDER);
  }, []);

  const displayHost = host ?? HOST_PLACEHOLDER;

  const mailtoHref = useMemo(() => {
    const subject = `Idea for ${displayHost}`;
    const params = new URLSearchParams({
      subject,
      body: `Hi ${siteConfig.name},\n\nI had an idea for ${displayHost}…\n\n`,
    });
    return `mailto:${siteConfig.contactEmail}?${params.toString()}`;
  }, [displayHost]);

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,oklch(0.92_0.04_260/0.35),transparent)] dark:bg-[radial-gradient(80%_60%_at_50%_-10%,oklch(0.35_0.08_260/0.35),transparent)]"
      />
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16 sm:py-24">
        <header className="space-y-4 text-center sm:text-left">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Parked domain
          </p>
          <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            You found{" "}
            <span className="text-primary underline decoration-primary/30 decoration-dotted underline-offset-4">
              {displayHost}
            </span>
            .
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            I probably already have an idea for this one — but if you think
            you&apos;ve got a better one, I&apos;d love to hear it.
          </p>
        </header>

        <section className="space-y-5 rounded-xl border bg-card/60 p-6 text-card-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm">
          <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
            About me
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative mx-auto aspect-square w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl bg-muted shadow-md ring-1 ring-foreground/10 sm:mx-0 sm:w-44">
              <Image
                src={siteConfig.portraitUrl}
                alt={siteConfig.portraitAlt}
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 640px) 220px, 176px"
                priority
              />
            </div>
            <p className="min-w-0 flex-1 leading-relaxed text-pretty">
              {siteConfig.bio}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Some of my stuff
            </h2>
            <p className="text-sm text-muted-foreground">
              Links with each site&apos;s OG preview image.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {siteConfig.projects.map((project) => (
              <li key={project.url}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Card className="h-full overflow-hidden pt-0 transition-shadow group-hover:shadow-md">
                    <div className="relative aspect-[1200/630] w-full bg-muted">
                      <Image
                        src={linkPreviewImage(project.url)}
                        alt={`Social preview for ${project.name}`}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="transition-colors group-hover:text-primary">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {project.blurb}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/40 px-4 py-3">
                      <span
                        className={cn(
                          buttonVariants({ variant: "secondary", size: "sm" }),
                          "pointer-events-none inline-flex w-full justify-center gap-2",
                        )}
                      >
                        Open site
                        <ExternalLink className="size-3.5" aria-hidden />
                      </span>
                    </CardFooter>
                  </Card>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Got an idea for{" "}
            <span className="font-medium text-foreground">{displayHost}</span>?
          </p>
          <Button
            nativeButton={false}
            size="lg"
            className="w-full justify-center sm:w-auto"
            render={
              <a href={mailtoHref}>Email {siteConfig.contactEmail}</a>
            }
          />
        </section>
      </main>
    </div>
  );
}
