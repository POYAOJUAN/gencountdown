export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GenCountdown",
  description: "Generate countdowns easily.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [] as Array<{ label: string; href: string }>,
  links: {
    github: "https://github.com/poyaojuan/gencountdown",
    docs: "https://poyaojuan.github.io/gencountdown",
  },
};
