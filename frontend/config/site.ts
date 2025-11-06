export const siteConfig = {
  name: "MET Repairs",
  domain: "metrepairs.com",
  contactEmail: "mytech@metrepairs.com",
  nav: [
    { label: "Home", path: "/home" },
    { label: "Services", path: "/services" },
    { label: "Booking", path: "/booking" },
    { label: "Get a Quote", path: "/quote" },
    { label: "Projects", path: "/projects" },
    { label: "Reviews", path: "/reviews" },
    { label: "Resources", path: "/resources" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;


