import React, { useState } from 'react';
import '../styles/searchStyle.css';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here, e.g., make an API call with the searchTerm
    console.log('Searching for:', searchTerm);

    navigate(`/details/${searchTerm}`)
    setSearchTerm("")
    // You can perform a search API call here and handle the results accordingly
  };

  return (
    <div className="Card">
      <div className="CardInner">
        <div className="container">
          <div className="Icon" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#657789"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="InputContainer">
            <input
              placeholder="It just can't be pizza..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={(e) => {if(e.key == "Enter") handleSearch()}}
            />
            {/* You can also handle search on pressing Enter key */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
