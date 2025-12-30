import { useEffect, useState } from "react";
import api from "../api";

export default function LibraryForm({ edit, clear, reload }) {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    book_id: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/students").then(r => setStudents(r.data.rows));
    api.get("/books").then(r => setBooks(r.data.rows));
  }, []);

  useEffect(() => {
    if (edit) {
      setForm({
        student_id: edit.student_id, // UUID STRING
        book_id: edit.book_id,       // UUID STRING
        start_date: edit.start_date,
        end_date: edit.end_date,
      });
    }
    setError("");
  }, [edit]);

  const isValid =
    form.student_id &&
    form.book_id &&
    form.start_date &&
    form.end_date;

  const submit = async () => {
    if (!isValid) {
      setError("⚠️ All fields are required");
      return;
    }

    try {
      if (edit) {
        await api.put(`/library/${edit.id}`, form);
      } else {
        await api.post("/library", form);
      }
      cancel();
      reload();
    } catch (err) {
      console.error(err);
      setError("Failed to save library record");
    }
  };

  const cancel = () => {
    setForm({ student_id: "", book_id: "", start_date: "", end_date: "" });
    setError("");
    clear();
  };

  return (
    <>
      <div className="form-row">
        Student:
        <select
          value={form.student_id}
          onChange={e => setForm({ ...form, student_id: e.target.value })}
        >
          <option value="">Select</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        Book:
        <select
          value={form.book_id}
          onChange={e => setForm({ ...form, book_id: e.target.value })}
        >
          <option value="">Select</option>
          {books.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        Start Date:
        <input
          type="date"
          value={form.start_date}
          onChange={e => setForm({ ...form, start_date: e.target.value })}
        />
      </div>

      <div className="form-row">
        End Date:
        <input
          type="date"
          value={form.end_date}
          onChange={e => setForm({ ...form, end_date: e.target.value })}
        />
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={submit} disabled={!isValid}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </>
  );
}
