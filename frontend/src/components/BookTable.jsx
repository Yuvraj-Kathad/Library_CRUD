import api from "../api";
import SortableHeader from "./SortableHeader";

export default function BookTable({ data, onEdit, reload, sortBy, order, onSort }) {
  const del = async (id) => {
    await api.delete(`/books/${id}`);
    reload();
  };

  return (
    <table>
      <thead>
        <tr>
          <SortableHeader label="Name" column="name" {...{ sortBy, order, onSort }} />
          <SortableHeader label="Author" column="author" {...{ sortBy, order, onSort }} />
          <SortableHeader label="Publication" column="publication" {...{ sortBy, order, onSort }} />
          <SortableHeader label="Year" column="year" {...{ sortBy, order, onSort }} />
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(b => (
          <tr key={b.id}>
            <td>{b.name}</td>     
            <td>{b.author}</td>
            <td>{b.publication}</td>
            <td>{b.year}</td>
            <td>
              <button onClick={() => onEdit(b)}>Edit</button>
              <button onClick={() => del(b.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
