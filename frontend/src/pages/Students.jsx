import { useEffect, useState } from "react";
import api from "../api";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";

export default function Students() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const LIMIT = 3;

  const load = async () => {
    const res = await api.get("/students", {
      params: { search, page, limit: LIMIT, sortBy, order },
    });
    setData(res.data.rows);
    setTotal(res.data.total);
  };

  useEffect(() => {
    load();
  }, [search, page, sortBy, order]);

  const onSort = (col) => {
    if (sortBy === col) {
      setOrder(o => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setOrder("asc");
    }
    setPage(1);
  };

  return (
    <div className="box">
      <h2>1. Student</h2>

      <StudentForm edit={edit} clear={() => setEdit(null)} reload={load} />

      <h3>
        Student Table
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
      </h3>

      <StudentTable
        data={data}
        onEdit={setEdit}
        reload={load}
        sortBy={sortBy}
        order={order}
        onSort={onSort}
      />

      <Pagination
        page={page}
        setPage={setPage}
        total={total}
        limit={LIMIT}
      />
    </div>
  );
}
