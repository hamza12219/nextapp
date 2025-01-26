// src/pages/api/searchTravel.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate } = req.query;

    // Example: Query your database to filter the travel packs based on dates.
    // This is a mock response to simulate fetching data based on dates
    const allTravelPacks = [
      { id: 1, title: "Beach Vacation", startDate: "2025-02-01", endDate: "2025-02-15", description: "A relaxing beach vacation." },
      { id: 2, title: "Mountain Hiking", startDate: "2025-03-01", endDate: "2025-03-10", description: "An adventurous mountain hike." },
      { id: 3, title: "City Tour", startDate: "2025-02-15", endDate: "2025-02-20", description: "Explore the city's best spots." }
    ];

    // Filtering based on date range
    const filteredPacks = allTravelPacks.filter(pack => {
      const packStartDate = new Date(pack.startDate);
      const packEndDate = new Date(pack.endDate);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);
      
      // Check if travel pack is within the selected date range
      return (packStartDate >= selectedStartDate && packEndDate <= selectedEndDate);
    });

    // Return filtered travel packs
    res.status(200).json(filteredPacks);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
