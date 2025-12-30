const express = require("express");
const router = express.Router();
const pool = require("../db"); // 🔴 THIS MUST EXIST

// CREATE
router.post("/", async (req, res) => {
  try {
    const { student_id, book_id, start_date, end_date } = req.body;

    const r = await pool.query(
      `INSERT INTO library_records (student_id, book_id, start_date, end_date)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [student_id, book_id, start_date, end_date]
    );

    res.json(r.rows[0]);
  } catch (err) {
    console.error("LIBRARY POST ERROR:", err);
    res.status(500).json({ error: "Library insert failed" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const search = (req.query.search || "").toLowerCase();
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 5);
    const offset = (page - 1) * limit;

    const sortMap = {
      student_name: "s.name",
      book_name: "b.name",
      start_date: "lr.start_date",
      end_date: "lr.end_date",
      created_at: "lr.created_at",
    };

    const sortBy = sortMap[req.query.sortBy] || "lr.created_at";
    const order = req.query.order === "asc" ? "ASC" : "DESC";

    const dataQuery = `
      SELECT
        lr.id,
        lr.student_id,
        lr.book_id,
        s.name AS student_name,
        b.name AS book_name,
        lr.start_date,
        lr.end_date
      FROM library_records lr
      JOIN students s ON s.id = lr.student_id
      JOIN books b ON b.id = lr.book_id
      WHERE lower(s.name) LIKE $1 OR lower(b.name) LIKE $1
      ORDER BY ${sortBy} ${order}
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM library_records lr
      JOIN students s ON s.id = lr.student_id
      JOIN books b ON b.id = lr.book_id
      WHERE lower(s.name) LIKE $1 OR lower(b.name) LIKE $1
    `;

    const [data, count] = await Promise.all([
      pool.query(dataQuery, [`%${search}%`, limit, offset]),
      pool.query(countQuery, [`%${search}%`]),
    ]);

    res.json({
      rows: data.rows,
      total: Number(count.rows[0].count),
    });
  } catch (err) {
    console.error("LIBRARY GET ERROR:", err);
    res.status(500).json({ error: "Library fetch failed" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { student_id, book_id, start_date, end_date } = req.body;

    const r = await pool.query(
      `UPDATE library_records
       SET student_id=$1, book_id=$2, start_date=$3, end_date=$4
       WHERE id=$5
       RETURNING *`,
      [student_id, book_id, start_date, end_date, req.params.id]
    );

    res.json(r.rows[0]);
  } catch (err) {
    console.error("LIBRARY UPDATE ERROR:", err);
    res.status(500).json({ error: "Library update failed" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM library_records WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error("LIBRARY DELETE ERROR:", err);
    res.status(500).json({ error: "Library delete failed" });
  }
});

module.exports = router;
