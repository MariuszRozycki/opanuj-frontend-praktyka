import SelectFilter from './SelectFilter';
import InputFilterValue from './InputFilterValue';
import SelectSortBy from './SelectSortBy';

type SearchFormProps = {
  filter: string;
  setFilter: (filter: string) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
};

function SearchForm({
  filter,
  setFilter,
  filterValue,
  setFilterValue,
  sortOption,
  setSortOption,
}: SearchFormProps) {
  return (
    <form className="space-x-4 flex items-end justify-center">
      <SelectFilter filter={filter} setFilter={setFilter} />
      <InputFilterValue filterValue={filterValue} setFilterValue={setFilterValue}/>
      <SelectSortBy sortOption={sortOption} setSortOption={setSortOption}/>
    </form>
  );
} 

export default SearchForm;
