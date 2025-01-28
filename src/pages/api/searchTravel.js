export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate, keywords, location } = req.query;

    // Example: Mocked data for travel packs
    const allTravelPacks = [
      { id: 1, title: "Beach Vacation", startDate: "2025-02-01", endDate: "2025-02-15", description: "A relaxing beach vacation.", location: "California" },
      { id: 2, title: "Mountain Hiking", startDate: "2025-03-01", endDate: "2025-03-10", description: "An adventurous mountain hike.", location: "Colorado" },
      { id: 3, title: "City Tour", startDate: "2025-02-15", endDate: "2025-02-20", description: "Explore the city's best spots.", location: "New York" }
    ];

    // Filtering based on date range
    const filteredPacks = allTravelPacks.filter(pack => {
      const packStartDate = new Date(pack.startDate);
      const packEndDate = new Date(pack.endDate);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      // Check if travel pack is within the selected date range
      const dateMatches = packStartDate >= selectedStartDate && packEndDate <= selectedEndDate;

      // Keyword filter: case-insensitive match on title or description
      const keywordMatches = keywords ? (pack.title.toLowerCase().includes(keywords.toLowerCase()) || pack.description.toLowerCase().includes(keywords.toLowerCase())) : true;

      // Location filter: case-insensitive match on location
      const locationMatches = location ? pack.location.toLowerCase().includes(location.toLowerCase()) : true;

      // Return true if all filters match
      return dateMatches && keywordMatches && locationMatches;
    });

    // Return filtered travel packs
    res.status(200).json(filteredPacks);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

