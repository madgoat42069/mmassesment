import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/artists/suggestions?q=${query}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    const term = suggestion.type === 'Artist' ? suggestion.name : suggestion.title;
    setSearchTerm(term);
    setShowSuggestions(false);
    navigate(`/search/${term}`);
  };

  return (
    <div className="relative">
      <form
        autoComplete="off"
        className="p-2 text-gray-400 focus-within:text-gray-600"
        onSubmit={handleSubmit}
      >
        <label htmlFor="search-field" className="sr-only">
          Search all songs
        </label>
        <div className="flex flex-row justify-start items-center">
          <FiSearch className="w-5 h-5 ml-4" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none border-b-2 border-[#887bb7] placeholder-gray-500 text-base text-white p-4"
          />
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {suggestion.type}: {suggestion.name || suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
