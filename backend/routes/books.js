const express = require("express");
const router = express.Router();
const pool = require("../db");

/* CREATE */
router.post("/", async (req, res) => {
  const { name, author, publication, year } = req.body;
  const r = await pool.query(
    `INSERT INTO books (name, author, publication, year)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, author, publication, year]
  );
  res.json(r.rows[0]);
});

/* READ + SEARCH + SORT + PAGINATION */
router.get("/", async (req, res) => {
  const search = (req.query.search || "").toLowerCase();
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 5);
  const offset = (page - 1) * limit;

  const allowedSort = ["name", "author", "year", "created_at"];
  const sortBy = allowedSort.includes(req.query.sortBy)
    ? req.query.sortBy
    : "created_at";
  const order = req.query.order === "asc" ? "ASC" : "DESC";

  const dataQuery = `
    SELECT * FROM books
    WHERE lower(name) LIKE $1 OR lower(author) LIKE $1
    ORDER BY ${sortBy} ${order}
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) FROM books
    WHERE lower(name) LIKE $1 OR lower(author) LIKE $1
  `;

  const [data, count] = await Promise.all([
    pool.query(dataQuery, [`%${search}%`, limit, offset]),
    pool.query(countQuery, [`%${search}%`]),
  ]);

  res.json({
    rows: data.rows,
    total: Number(count.rows[0].count),
  });
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const { name, author, publication, year } = req.body;
  const r = await pool.query(
    `UPDATE books
     SET name=$1, author=$2, publication=$3, year=$4
     WHERE id=$5 RETURNING *`,
    [name, author, publication, year, req.params.id]
  );
  res.json(r.rows[0]);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM books WHERE id=$1", [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
