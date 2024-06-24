import { Country } from '../types/Country';

type CountryListProps = {
  countries: Country[];
};

function CountryList({ countries }: CountryListProps) {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>No countries found.</p>;
  }

  return (
    <ol className="grid grid-cols-1 gap-4 list-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <li key={country.name.common} className="flex flex-col items-center">
          <h3>{country.name.common}</h3>
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </li>
      ))}
    </ol>
  );
}

export default CountryList;
