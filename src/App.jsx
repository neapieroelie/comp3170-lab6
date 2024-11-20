import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState('');
  const [subregion, setSubregion] = useState('');
  const [sort, setSort] = useState('asc');
  const [topTen, setTopTen] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
    setSubregion(''); // Reset subregion when continent changes
  };

  const handleSubregionChange = (event) => {
    setSubregion(event.target.value);
    setContinent(''); // Reset continent when subregion changes
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleTopTenChange = (event) => {
    setTopTen(event.target.value);
    setContinent('');
    setSubregion('');
  };

  const applyFiltersAndSort = (countries) => {
    let filtered = countries.filter(country => {
      if (continent) {
        return country.continents.includes(continent);
      } else if (subregion) {
        return country.subregion === subregion;
      }
      return true;
    });

    if (topTen) {
      filtered = filtered.sort((a, b) => b[topTen] - a[topTen]).slice(0, 10);
    } else if (sort === 'asc') {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
    }

    return filtered;
  };

  return (
    <div>
      <div>
        <h1>Countries of the World</h1>
      </div>
      <div className="filter-sort-box">
        <h2>Filter and Sorts</h2>
        <select value={continent} onChange={handleContinentChange}>
          <option value="">Filter by Continent</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Australia">Australia</option>
          <option value="Antarctica">Antarctica</option>
        </select>
        <select value={subregion} onChange={handleSubregionChange}>
          <option value="">Filter by Subregion</option>
          <option value="Eastern Africa">Eastern Africa</option>
          <option value="Middle Africa">Middle Africa</option>
          <option value="Northern Africa">Northern Africa</option>
          <option value="Southern Africa">Southern Africa</option>
          <option value="Western Africa">Western Africa</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central America">Central America</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Central Asia">Central Asia</option>
          <option value="Eastern Asia">Eastern Asia</option>
          <option value="South-Eastern Asia">South-Eastern Asia</option>
          <option value="Southern Asia">Southern Asia</option>
          <option value="Western Asia">Western Asia</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="Northern Europe">Northern Europe</option>
          <option value="Southern Europe">Southern Europe</option>
          <option value="Western Europe">Western Europe</option>
          <option value="Australia and New Zealand">Australia and New Zealand</option>
          <option value="Melanesia">Melanesia</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Polynesia">Polynesia</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
        <select onChange={handleTopTenChange}>
          <option value="">Select Top 10</option>
          <option value="population">Top 10 by Population</option>
          <option value="area">Top 10 by Area</option>
        </select>
      </div>
      <Countries countries={applyFiltersAndSort(countries)} />
    </div>
  );
}

export default App;
