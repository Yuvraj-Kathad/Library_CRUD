const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

/* FILE UPLOAD */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* CREATE */
router.post(
  "/",
  upload.fields([{ name: "photo" }, { name: "video" }]),
  async (req, res) => {
    const { name, class: cls } = req.body;
    const photo = req.files?.photo?.[0]?.filename || null;
    const video = req.files?.video?.[0]?.filename || null;

    const r = await pool.query(
      `INSERT INTO students (name, class, photo_path, video_path)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, cls, photo, video]
    );
    res.json(r.rows[0]);
  }
);

/* READ + SEARCH + SORT + PAGINATION */
router.get("/", async (req, res) => {
  const search = (req.query.search || "").toLowerCase();
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 5);
  const offset = (page - 1) * limit;

  const allowedSort = ["name", "class", "created_at"];
  const sortBy = allowedSort.includes(req.query.sortBy)
    ? req.query.sortBy
    : "created_at";
  const order = req.query.order === "asc" ? "ASC" : "DESC";

  const dataQuery = `
    SELECT * FROM students
    WHERE lower(name) LIKE $1
    ORDER BY ${sortBy} ${order}
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) FROM students
    WHERE lower(name) LIKE $1
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
router.put(
  "/:id",
  upload.fields([{ name: "photo" }, { name: "video" }]),
  async (req, res) => {
    const { name, class: cls } = req.body;
    const photo = req.files?.photo?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    const r = await pool.query(
      `UPDATE students
       SET name=$1, class=$2,
           photo_path=COALESCE($3, photo_path),
           video_path=COALESCE($4, video_path)
       WHERE id=$5 RETURNING *`,
      [name, cls, photo, video, req.params.id]
    );

    res.json(r.rows[0]);
  }
);

/* DELETE */
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM students WHERE id=$1", [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
