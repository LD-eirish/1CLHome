import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { PageBreadcrumb } from "../components/PageBreadcrumb";
import "../styles/library.css";

interface ArticleEntry {
  readonly title: string;
  readonly type: "info" | "guide";
  readonly path: string;
  readonly summary: string;
  readonly keywords: string[];
}

interface CategoryEntry {
  readonly name: string;
  readonly articles: ArticleEntry[];
}

const CATEGORIES: readonly CategoryEntry[] = [
  {
    name: "About 1CL",
    articles: [
      {
        title: "What is the 1st Combined Legion?",
        type: "info",
        path: "/info-library/what-is-1cl",
        summary:
          "History, values, structure, and how to join the 1CL community.",
        keywords: [
          "1cl",
          "combined legion",
          "coalition",
          "federation",
          "overview",
          "about",
        ],
      },
        {
        title: "Joining 1CL as a Regiment",
        type: "info",
        path: "/info-library/joining-1cl-as-a-regiment",
        summary:
          "Membership requirements, expectations, and benefits for regiments joining the 1CL federation.",
        keywords: [
          "join",
          "joining",
          "recruitment",
          "requirements",
          "membership",
          "regiment",
        ],
      },
      {
        title: "High Commanders of 1CL",
        type: "info",
        path: "/info-library/high-commanders",
        summary:
          "Historical and current records of 1CL High Commanders and their terms.",
        keywords: [
          "high command",
          "commander",
          "leadership",
          "history",
          "office period",
        ],
      },
      {
        title: "1CL Medal Overview",
        type: "info",
        path: "/info-library/medal-program",
        summary:
          "Official medal categories, nomination flow, prestige tiers, and award governance.",
        keywords: [
          "medal",
          "overview",
          "award",
          "nomination",
          "prestige",
          "honor",
          "decorations",
        ],
      },
      {
        title: "1CL Roles Overview",
        type: "info",
        path: "/info-library/roles-overview",
        summary:
          "Rank structure, officer responsibilities, branch roles, pings, verification, and group-specific roles.",
        keywords: [
          "roles",
          "rank",
          "commander",
          "officer",
          "logistics",
          "facility",
          "verification",
          "ping",
        ],
      },
    ],
  },
  {
    name: "Guides",
    articles: [
      {
        title: "1CL Command and Control",
        type: "guide",
        path: "/info-library/command-and-control",
        summary:
          "Overview of the 1CL Command and Control system, its purpose, and how it works.",
        keywords: [
          "command",
          "control",
          "1cl",
          "communication",
          "coordination",
        ],
      },
      {
        title: "Suggested Mods",
        type: "guide",
        path: "/info-library/suggested-mods",
        summary:
          "A curated list of recommended mods to enhance your Foxhole gameplay experience.",
        keywords: [
          "mods",
          "suggested",
          "recommended",
          "foxhole",
          "gameplay",
          "enhancement",
        ],
      },
    ],
  },
  {
    name: "1CL Training Courses",
    articles: [
      {
        title: "1CL Basic Infantry Training Course",
        type: "guide",
        path: "/info-library/basic-infantry-training-course",
        summary:
          "Infantry-focused training presentation covering tips, tricks, tactics, and loadouts for successful frontline play.",
        keywords: [
          "training",
          "course",
          "infantry",
          "tips",
          "tricks",
          "tactics",
          "loadouts",
          "onboarding",
        ],
      },
    ],
  },
];

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toBigrams(word: string): Set<string> {
  const value = ` ${word} `;
  const grams = new Set<string>();

  for (let i = 0; i < value.length - 1; i += 1) {
    grams.add(value.slice(i, i + 2));
  }

  return grams;
}

function diceCoefficient(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const aGrams = toBigrams(a);
  const bGrams = toBigrams(b);
  let overlap = 0;

  aGrams.forEach((gram) => {
    if (bGrams.has(gram)) {
      overlap += 1;
    }
  });

  return (2 * overlap) / (aGrams.size + bGrams.size);
}

function scoreArticle(article: ArticleEntry, query: string): number {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return 0;
  }

  const title = normalize(article.title);
  const summary = normalize(article.summary);
  const keywords = normalize(article.keywords.join(" "));
  const haystack = `${title} ${summary} ${keywords}`;

  let score = 0;
  if (title.includes(normalizedQuery)) score += 15;
  if (summary.includes(normalizedQuery)) score += 10;
  if (keywords.includes(normalizedQuery)) score += 9;

  const queryTokens = normalizedQuery
    .split(" ")
    .filter((token) => token.length > 1);
  const articleTokens = haystack.split(" ").filter((token) => token.length > 1);
  const articleTitleTokens = new Set(
    title.split(" ").filter((token) => token.length > 1),
  );

  queryTokens.forEach((token) => {
    if (articleTitleTokens.has(token)) score += 8;
    if (articleTokens.includes(token)) score += 5;
    if (articleTokens.some((candidate) => candidate.startsWith(token)))
      score += 3;
    if (haystack.includes(token)) score += 1;

    const bestFuzzy = articleTokens.reduce((best, candidate) => {
      const current = diceCoefficient(token, candidate);
      return Math.max(best, current);
    }, 0);

    if (bestFuzzy >= 0.8) score += 4;
    else if (bestFuzzy >= 0.65) score += 2;
    else if (bestFuzzy >= 0.5) score += 1;
  });

  return score;
}

export function InfoLibraryPage() {
  const [query, setQuery] = useState("");

  const allArticles = useMemo(
    () => CATEGORIES.flatMap((category) => category.articles),
    [],
  );

  const trimmedQuery = query.trim();

  const searchResults = useMemo(() => {
    if (!trimmedQuery) {
      return [];
    }

    const scored = allArticles
      .map((article) => ({
        article,
        score: scoreArticle(article, trimmedQuery),
      }))
      .filter((entry) => entry.score >= 2)
      .sort((left, right) => right.score - left.score);

    return scored.map((entry) => entry.article);
  }, [allArticles, trimmedQuery]);

  return (
    <>
      <Header subtitle="1CL Wiki & Info" />
      <PageBreadcrumb
        items={[{ label: "Hub", to: "/hub" }, { label: "1CL Wiki & Info" }]}
      />
      <main className="wiki-hub">
        <div className="wiki-hub-inner">
          <section className="wiki-hub-hero">
            <p className="wiki-hub-kicker">Wiki & Info</p>
            <h1 className="wiki-hub-title">1CL Wiki & Info</h1>
            <p className="wiki-hub-lead">
              A community reference covering the 1st Combined Legion, guides for
              members and newcomers, and medal records. Search by topic, role,
              or keyword to quickly find relevant pages.
            </p>

            <div className="wiki-search-shell">
              <label className="wiki-search-label" htmlFor="wiki-search-input">
                Search Wiki Pages
              </label>
              <input
                id="wiki-search-input"
                className="wiki-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search here by topic, role, or keyword..."
              />
            </div>
          </section>

          {trimmedQuery ? (
            <div className="wiki-category-block">
              <div className="wiki-category-header">
                <h2 className="wiki-category-name">
                  Search Results ({searchResults.length})
                </h2>
              </div>
              <div className="wiki-article-grid">
                {searchResults.length > 0 ? (
                  searchResults.map((article) => (
                    <div key={article.path} className="wiki-article-card">
                      <Link to={article.path} className="wiki-card-link">
                        {article.title}
                      </Link>
                      <p className="wiki-card-summary">{article.summary}</p>
                    </div>
                  ))
                ) : (
                  <div className="wiki-article-card">
                    <p className="wiki-card-summary">
                      No close matches found. Try broader words like{" "}
                      <strong>join</strong>, <strong>command</strong>,{" "}
                      <strong>medal</strong>, or <strong>federation</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            CATEGORIES.map((cat) => (
              <div key={cat.name} className="wiki-category-block">
                <div className="wiki-category-header">
                  <h2 className="wiki-category-name">{cat.name}</h2>
                </div>
                <div className="wiki-article-grid">
                  {cat.articles.map((article) => (
                    <div key={article.path} className="wiki-article-card">
                      <Link to={article.path} className="wiki-card-link">
                        {article.title}
                      </Link>
                      <p className="wiki-card-summary">{article.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
