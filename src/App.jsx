import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import SearchInput from './components/SearchInput.jsx';
import SearchResults from './components/SearchResults.jsx';
import WatchedList from './components/WatchedList.jsx';

const API_KEY = '558e543e6cc18ea7707d040ea08a0533';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [watchedSeries, setWatchedSeries] = useState(
    JSON.parse(localStorage.getItem('watchedSeries'))?.sort((a, b) => a.name.localeCompare(b.name)) || []
  );
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('watchedSeries', JSON.stringify(watchedSeries));
  }, [watchedSeries]);

  const searchSeries = async (query) => {
    if (!query) {
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      // Sortera resultaten i bokstavsordning efter serienamn
      const sortedResults = (data.results || []).sort((a, b) => 
        a.name.localeCompare(b.name)
      );

      setSearchResults(sortedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const toggleWatchStatus = (series) => {
    const exists = watchedSeries.find((item) => item.id === series.id);
    let updatedSeries;

    if (exists) {
      updatedSeries = watchedSeries.filter((item) => item.id !== series.id);
    } else {
      updatedSeries = [...watchedSeries, { ...series, poster: `${IMAGE_BASE_URL}${series.poster_path}` }];
    }

    // Sortera den uppdaterade listan i bokstavsordning
    updatedSeries.sort((a, b) => a.name.localeCompare(b.name));

    setWatchedSeries(updatedSeries);
  };

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    if (showResults) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showResults]);

  return (
    <div className="App">
      <Header />
      <SearchInput onSearch={searchSeries} />
      {showResults && (
        <SearchResults
          ref={searchResultsRef}
          results={searchResults}
          watchedSeries={watchedSeries}
          onToggleWatch={toggleWatchStatus}
        />
      )}
      <WatchedList
        className={showResults ? 'blurred' : ''}
        watchedSeries={watchedSeries}
        onRemove={toggleWatchStatus}
      />
    </div>
  );
}

export default App;