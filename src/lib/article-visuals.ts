export interface ArticleVisual {
  basePath: string;
  alt: string;
}

const visualMatchers = [
  {
    pattern: /silent teacher/i,
    visual: {
      basePath: "/article-silent",
      alt: "The Silent Teacher article artwork",
    },
  },
  {
    pattern: /(beyond mediocrity|mastery|effort has a structure|focus)/i,
    visual: {
      basePath: "/article-growth",
      alt: "Growth-themed article artwork",
    },
  },
  {
    pattern: /(arrays|autocomplete|compiler|engineering|software|writing)/i,
    visual: {
      basePath: "/article-default",
      alt: "Substack article artwork",
    },
  },
];

export const getArticleVisual = (title: string, href?: string): ArticleVisual => {
  const matchKey = `${title} ${href ?? ""}`;
  const matched = visualMatchers.find(({ pattern }) => pattern.test(matchKey));

  return matched?.visual ?? {
    basePath: "/article-default",
    alt: `${title} article artwork`,
  };
};
