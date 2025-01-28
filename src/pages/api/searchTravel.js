// api/searchArticles.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate, keywords, location } = req.query;

    // Example real articles
    const articles = [
      { id: 1, title: "Event 1", excerpt: "This is a fake blog post about technology.", image: "a.jpg", date: new Date(2025, 0, 15), location: "24200 Dana Point Harbor, Dana Point, CA" },
      { id: 2, title: "Event 2", excerpt: "This post discusses the future of web development.", image: "b.jpg", date: new Date(2025, 1, 5), location: "24200 Dana Point Harbor, Dana Point, CA" },
      { id: 3, title: "Event 3", excerpt: "This article dives into the world of artificial intelligence.", image: "c.jpg", date: new Date(2025, 1, 10), location: "24200 Dana Point Harbor, Dana Point, CA" },
      { id: 4, title: "Event 4", excerpt: "This article dives into the world of artificial intelligence.", image: "d.jpg", date: new Date(2025, 1, 15), location: "24200 Dana Point Harbor, Dana Point, CA" },
      { id: 5, title: "Event 5", excerpt: "This article dives into the world of artificial intelligence.", image: "e.jpg", date: new Date(2025, 1, 20), location: "24200 Dana Point Harbor, Dana Point, CA" },
    ];

    // If no filters are applied, return all articles
    const filteredArticles = articles.filter(article => {
      // Date Range Filter
      const articleDate = article.date;
      const matchesDateRange = startDate && endDate
        ? articleDate >= new Date(startDate) && articleDate <= new Date(endDate)
        : true;

      // Keyword Filter
      const matchesKeyword = keywords
        ? article.title.toLowerCase().includes(keywords.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(keywords.toLowerCase())
        : true;

      // Location Filter
      const matchesLocation = location
        ? article.location.toLowerCase().includes(location.toLowerCase())
        : true;

      return matchesDateRange && matchesKeyword && matchesLocation;
    });

    // Return filtered articles
    res.status(200).json(filteredArticles);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
