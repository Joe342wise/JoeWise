export interface Article {
    title: string;
    date: string;
    excerpt: string;
    href: string;
    readTime: string;
    image?: string;
}

// Articles ordered by date (newest first)
export const articles: Article[] = [
    {
        title: "The Silent Teacher: Struggle, Patience, and Small Beginnings",
        date: "2025-08-27",
        excerpt: "Growth isn't glamorous. It happens in struggle, through patience, and the humility to ask for help.",
        href: "https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/the-silent-teacher?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        readTime: "5 min",
    },
    {
        title: "Arrays Were the Highlight of the Day",
        date: "2024-12-15",
        excerpt: "A deep dive into array data structures and their practical applications in programming.",
        href: "https://sedate-nemophila-92c.notion.site/Arrays-Were-the-Highlight-of-the-Day-23f3c2801afd8020a110c10d013efbdf?source=copy_link",
        readTime: "25 min",
    },
    {
        title: "Beyond Mediocrity: The Power of Focused Reflection in Mastery",
        date: "2024-11-20",
        excerpt: "How deliberate reflection and deep work can accelerate the journey from competence to mastery.",
        href: "https://sedate-nemophila-92c.notion.site/Beyond-Mediocrity-The-Power-of-Focused-Reflection-in-Mastery-2433c2801afd807da2eeebb79aa430a4?pvs=73",
        readTime: "5 min",
    },
    {
        title: "Autocomplete with Tries in Go: From Problem to Solution",
        date: "2024-10-08",
        excerpt: "Building an efficient autocomplete system using trie data structures in Go.",
        href: "https://sedate-nemophila-92c.notion.site/Autocomplete-with-Tries-in-Go-From-Problem-to-Solution-22f3c2801afd809a890fcf9de91e357a?pvs=141",
        readTime: "25 min",
    },
];

// Get latest N articles
export const getLatestArticles = (count: number = 3) => articles.slice(0, count);
