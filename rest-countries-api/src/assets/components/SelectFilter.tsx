type SelectFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

function SelectFilter({ filter, setFilter }: SelectFilterProps) {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">Select filter</option>
      <option value="currency">Currency</option>
      <option value="language">Language</option>
      <option value="capital">Capital</option>
      <option value="name">Name</option>
    </select>
  );
}


export default SelectFilter;
