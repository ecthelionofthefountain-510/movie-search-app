import React from 'react';

const SearchResults = React.forwardRef(function SearchResultsComponent({ results, watchedSeries, onToggleWatch }, ref) {
  return (
    <section className="search-results" ref={ref}>
      <h2>Search Results</h2>
      <ul>
        {results.map((series) => {
          const isWatched = watchedSeries.some((item) => item.id === series.id);
          return (
            <li key={series.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
              />
              <h3>{series.name}</h3>
              <button
                onClick={() => onToggleWatch(series)}
                style={{ backgroundColor: isWatched ? 'green' : '#007BFF' }}
              >
                {isWatched ? 'Watched' : 'Add to Watched'}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export default SearchResults;