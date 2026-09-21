import type { NextConfig } from "next";

/**
 * The redesign collapsed seven routes into two (/work and /work/[slug]) plus
 * anchors on the homepage. These redirects keep every previously-indexed URL
 * working — permanent, so search engines transfer the ranking rather than
 * treating them as new pages.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /work was the projects index; every project now lives on the
      // homepage. The detail pages at /work/<slug> are untouched — this
      // matches the exact path only.
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/research", destination: "/#work", permanent: true },
      { source: "/hardware", destination: "/#work", permanent: true },
      { source: "/awards", destination: "/#stack", permanent: true },
      { source: "/skills", destination: "/#stack", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
