import { useEffect, useState } from "react";
import api from "../api";

export default function BookForm({ edit, clear, reload }) {
  const [form, setForm] = useState({
    name: "",
    author: "",
    publication: "",
    year: "",
  });

  useEffect(() => {
    if (edit) {
      setForm({
        name: edit.name || "",
        author: edit.author || "",
        publication: edit.publication || "",
        year: edit.year || "",
      });
    }
  }, [edit]);

  const submit = async () => {
    if (edit) {
      await api.put(`/books/${edit.id}`, form);
    } else {
      await api.post("/books", form);
    }
    cancel();
    reload();
  };

  const cancel = () => {
    setForm({ name: "", author: "", publication: "", year: "" });
    clear();
  };

  return (
    <>
      <div className="form-row">
        Name:
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-row">
        Author:
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
      </div>

      <div className="form-row">
        Publication:
        <input
          value={form.publication}
          onChange={(e) => setForm({ ...form, publication: e.target.value })}
        />
      </div>

      <div className="form-row">
        Year:
        <input
            type="number"
            placeholder="YYYY"
            min="1500"
            max={new Date().getFullYear()}
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
      </div>

      <button onClick={submit}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </>
  );
}
