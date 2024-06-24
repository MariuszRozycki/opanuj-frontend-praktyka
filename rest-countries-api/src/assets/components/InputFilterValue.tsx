type InputFilterValueProps = {
  filterValue: string;
  setFilterValue: (value: string) => void;
}

function InputFilterValue({filterValue, setFilterValue}: InputFilterValueProps) {
  return (
    <input
      type="text"
      placeholder="Filter value"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  )
}

export default InputFilterValue;
