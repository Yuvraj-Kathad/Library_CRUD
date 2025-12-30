export default function SortableHeader({ label, column, sortBy, order, onSort }) {
  const active = sortBy === column;

  return (
    <th
      onClick={() => onSort(column)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {label}
      <span style={{ marginLeft: 6, fontSize: 12 }}>
        {active ? (order === "asc" ? "▲" : "▼") : "⇅"}
      </span>
    </th>
  );
}
