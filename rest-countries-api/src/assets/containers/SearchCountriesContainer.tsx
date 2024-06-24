import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CountryList from '../components/CountryList';
import { Country } from '../types/Country';
import SearchTitle from '../components/SearchTitle';

function SearchCountriesContainer() {
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (filterValue === '') {
      setCountries([]);
      return;
    }

    if (filter && filterValue) {
      let endpoint = '';
      switch (filter) {
        case 'currency':
          endpoint = `https://restcountries.com/v3.1/currency/${filterValue}`;
          break;
        case 'language':
          endpoint = `https://restcountries.com/v3.1/lang/${filterValue}`;
          break;
        case 'capital':
          endpoint = `https://restcountries.com/v3.1/capital/${filterValue}`;
          break;
        case 'name':
          endpoint = `https://restcountries.com/v3.1/name/${filterValue}`;
          break;
        default:
          return;
      }

      fetch(endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setCountries(data);
          } else {
            setCountries([]);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      setCountries([]);
    }
  }, [filter, filterValue]);

  const sortedCountries = [...countries].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortOption === 'population') {
      return b.population - a.population;
    }
    return 0;
  });

  console.log(sortedCountries);
  

  return (
    <div className="SearchCountriesContainer">
      <SearchTitle />
      <SearchForm
        filter={filter}
        setFilter={setFilter}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <CountryList countries={countries} />
    </div>
  );
};

export default SearchCountriesContainer;
