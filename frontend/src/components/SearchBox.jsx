export default function SearchBox({ value, onChange }) {
  return (
    <input
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ float: "right" }}
    />
  );
}
