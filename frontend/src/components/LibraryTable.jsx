import api from "../api";
import SortableHeader from "./SortableHeader";

export default function LibraryTable({ data, sortBy, order, onSort, onEdit, reload }) {
  const del = async (id) => {
    await api.delete(`/library/${id}`);
    reload();
  };

  return (
    <table>
      <thead>
        <tr>
          <SortableHeader label="Student" column="student_name" {...{ sortBy, order, onSort }} />
          <SortableHeader label="Book" column="book_name" {...{ sortBy, order, onSort }} />
          <SortableHeader label="Start Date" column="start_date" {...{ sortBy, order, onSort }} />
          <SortableHeader label="End Date" column="end_date" {...{ sortBy, order, onSort }} />
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r=>(
          <tr key={r.id}>
            <td>{r.student_name}</td>
            <td>{r.book_name}</td>
            <td>{r.start_date}</td>
            <td>{r.end_date}</td>
            <td>
              <button onClick={()=>onEdit(r)}>Edit</button>
              <button onClick={()=>del(r.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
