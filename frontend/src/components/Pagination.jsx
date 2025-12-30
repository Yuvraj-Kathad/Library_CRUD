export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div style={{ textAlign: "center", marginTop: 12 }}>
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        ◀
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={{
            margin: "0 4px",
            fontWeight: page === p ? "bold" : "normal",
            background: page === p ? "#ddd" : "transparent",
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        ▶
      </button>
    </div>
  );
}
