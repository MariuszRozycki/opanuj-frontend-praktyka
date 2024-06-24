type SelectSortByProps = {
  sortOption: string;
  setSortOption: (option: string) => void;
}

function SelectSortBy({sortOption, setSortOption}: SelectSortByProps) {
  return (
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      <option value="">Sort by</option>
      <option value="name">Name</option>
      <option value="population">Population</option>
    </select>
  )
}

export default SelectSortBy;