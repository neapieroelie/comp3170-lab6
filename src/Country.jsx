import React from 'react';

function Country({ country }) {
  return (
    <div className="country">
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continent: {country.continents ? country.continents.join(', ') : 'N/A'}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
}

export default Country;
