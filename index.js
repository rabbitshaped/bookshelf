import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const db = new pg.Client({
	connectionString: process.env.DATABASE_URL,
});

db.connect();

// SHOW ALL BOOKS
app.get("/", async (req, res) => {
	const sort = req.query.sort;

	let query = "SELECT * FROM books";

	if (sort === "rating") {
		query += " ORDER BY rating DESC";
	} else if (sort === "title") {
		query += " ORDER BY title ASC";
	} else {
		query += " ORDER BY date_added DESC";
	}

	const result = await db.query(query);

	res.render("index", {
		books: result.rows,
		isDemo: true, // or process.env.NODE_ENV === "production"
	});
});

// NEW BOOK FORM
app.get("/new", (req, res) => {
	res.render("new");
});

// ADD BOOK
app.post("/add", async (req, res) => {
	const { title, author, isbn, rating, review, cover_url } = req.body;

	let cover = cover_url;

	if (!cover && isbn) {
		cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
	}

	await db.query(
		"INSERT INTO books (title, author, isbn, rating, review, cover_url) VALUES ($1,$2,$3,$4,$5,$6)",
		[title, author, isbn, rating, review, cover_url],
	);

	res.redirect("/");
});

// BOOK DETAILS
app.get("/book/:id", async (req, res) => {
	const id = req.params.id;

	const result = await db.query("SELECT * FROM books WHERE id=$1", [id]);

	const book = result.rows[0];

	res.render("book-details", { book });
});

// EDIT REVIEW
app.get("/edit/:id", async (req, res) => {
	const id = req.params.id;

	const result = await db.query("SELECT * FROM books WHERE id=$1", [id]);

	const book = result.rows[0];

	res.render("edit.ejs", { book });
});

// UPDATE REVIEW
app.post("/update/:id", async (req, res) => {
	const id = req.params.id;

	const { title, author, isbn, rating, review, cover_url } = req.body;

	await db.query(
		`UPDATE books 
	   SET title=$1,
		   author=$2,
		   isbn=$3,
		   rating=$4,
		   review=$5,
		   cover_url=$6
	   WHERE id=$7`,
		[title, author, isbn, rating, review, cover_url, id],
	);

	res.redirect("/");
});

// DELETE BOOK
app.post("/delete/:id", async (req, res) => {
	const id = req.params.id;

	await db.query("DELETE FROM books WHERE id = $1", [id]);

	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
