import React, { useState } from 'react';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      onSearch(e.target.value);
    }
  };

  return (
    <section className="search">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search shows"
      />
    </section>
  );
}

export default SearchInput;