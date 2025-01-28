import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Menu from '../components/Menu'; 
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css"; 

const articles = [
  { id: 1, title: "Blog Post 1", excerpt: "This is a fake blog post about technology.", image: "a.jpg", date: new Date(2025, 0, 15) },
  { id: 2, title: "Blog Post 2", excerpt: "This post discusses the future of web development.", image: "a.jpg", date: new Date(2025, 1, 5) },
  { id: 3, title: "Blog Post 3", excerpt: "This article dives into the world of artificial intelligence.", image: "a.jpg", date: new Date(2025, 1, 10) },
  { id: 4, title: "Blog Post 4", excerpt: "This article dives into the world of artificial intelligence.", image: "a.jpg", date: new Date(2025, 1, 15) },
  { id: 5, title: "Blog Post 5", excerpt: "This article dives into the world of artificial intelligence.", image: "a.jpg", date: new Date(2025, 1, 15) },
];

const Home = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventType, setEventType] = useState('');

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle dropdown visibility for the calendar
  const toggleCalendar = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Handle outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) && 
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle search/filter
  const handleSearch = () => {
    const filtered = articles.filter((article) => {
      const matchesDateRange = startDate && endDate ? article.date >= startDate && article.date <= endDate : true;
      const matchesKeyword = keywords ? article.title.toLowerCase().includes(keywords.toLowerCase()) : true;
      const matchesLocation = location ? article.excerpt.toLowerCase().includes(location.toLowerCase()) : true;
      return matchesDateRange && matchesKeyword && matchesLocation;
    });
    setFilteredArticles(filtered);
  };

  // Reset the date filter and clear the filtered articles
  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredArticles(articles); // Reset articles to original list
    setDropdownOpen(false); // Close the date range picker
  };

  // Handle cancel action (just closes the picker without applying any changes)
  const cancelDateRange = () => {
    setDropdownOpen(false); // Simply close the date picker
  };

  return (
    <div>
      <Menu /> {/* Include the Menu Component */}
      
      <div className="container mx-auto mt-5 px-4">
        <h1 className="text-4xl font-bold mb-8 text-black text-center opacity-80">
          Looking for a new adventure this weekend in Orange County, California?
        </h1>
        <h3 className="text-2xl font-bold mb-8 text-black text-center opacity-80">
          Search for an adventure below!
        </h3>

        {/* Search Section */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Keywords Search */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600">Keyword</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-black"
              placeholder="Search for events"
            />
          </div>

          {/* Location Search */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600 text-black">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-black"
              placeholder="Enter location"
            />
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col relative ">
            <label className="mb-2 text-sm text-gray-600">Date Range</label>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ''}
                className="p-3 border border-gray-300 rounded-md flex-grow text-black"
                placeholder="Select Date Range"
                onClick={toggleCalendar}
              />
            </div>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute wid mt-2 bg-white shadow-lg rounded-md w-64 p-4 z-50">
                {/* Date Range Picker Box */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsStart
                  placeholderText="Start Date"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsEnd
                  minDate={startDate}
                  placeholderText="End Date"
                  className="w-full p-2 border border-gray-300 rounded-md mt-4 text-black"
                />
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={clearDateRange}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Clear
                  </button>
                  <button
                    onClick={cancelDateRange}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grid of Filtered Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{margin:'auto';, marginLeft:'30px';}}>
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h5 className="text-black text-2xl font-semibold mb-4">{article.title}</h5>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <Link href={`/posts/${article.id}`} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
