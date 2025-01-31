import React from 'react';

function WatchedList({ watchedSeries, onRemove, className }) {
  return (
    <section className={`watched-list ${className}`}>
      <h2>Watched Shows</h2>
      <ul>
        {watchedSeries.map((series) => (
          <li key={series.id}>
            <img src={series.poster} alt={series.name} />
            <h3>{series.name}</h3>
            <button onClick={() => onRemove(series)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WatchedList;