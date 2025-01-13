import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "mo|cypher",
  EMAIL: "",
  NUM_POSTS_ON_HOMEPAGE: 4,
  NUM_PROJECTS_ON_HOMEPAGE: 4,
  NUM_WORKS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const LIST: Metadata = {
  TITLE: "List 100",
  DESCRIPTION: "A list of things I want to do before I die.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "Twitter-X",
    HREF: "https://twitter.com/morayo0x",
  },
  {
    NAME: "Github",
    HREF: "https://github.com/morayo0x",
  },
  //   {
  //     NAME: "linkedin",
  //     HREF: "",
  //   }
];
