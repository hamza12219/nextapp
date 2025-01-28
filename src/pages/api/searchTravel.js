export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate, keywords, location } = req.query;

    // Example: Mocked data for travel packs
    const allTravelPacks = [
      { id: 1, title: "Beach Vacation", startDate: "2025-02-01", endDate: "2025-02-15", description: "A relaxing beach vacation.", location: "California" },
      { id: 2, title: "Mountain Hiking", startDate: "2025-03-01", endDate: "2025-03-10", description: "An adventurous mountain hike.", location: "Colorado" },
      { id: 3, title: "City Tour", startDate: "2025-02-15", endDate: "2025-02-20", description: "Explore the city's best spots.", location: "New York" }
    ];

    // Default filters to true (no filtering) in case query params are missing
    const filteredPacks = allTravelPacks.filter(pack => {
      const packStartDate = new Date(pack.startDate);
      const packEndDate = new Date(pack.endDate);
      
      // Parse the incoming startDate and endDate
      const selectedStartDate = startDate ? new Date(startDate) : null;
      const selectedEndDate = endDate ? new Date(endDate) : null;

      // Date range filter: Check if the pack falls within the selected range
      const dateMatches = (selectedStartDate && selectedEndDate)
        ? (packStartDate >= selectedStartDate && packEndDate <= selectedEndDate)
        : true;

      // Keyword filter: case-insensitive match on title or description
      const keywordMatches = keywords ? (
        pack.title.toLowerCase().includes(keywords.toLowerCase()) ||
        pack.description.toLowerCase().includes(keywords.toLowerCase())
      ) : true;

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
