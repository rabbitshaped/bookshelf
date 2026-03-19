# 📚 Ira's Bookshelf

A small web app to track and display recently read books — with a focus on clean UI and simple interactions. I originally considered building a karaoke list (and honestly, I probably would have finished it sooner), but books won in the end. Even if I don’t read as much as I’d like, in my heart of hearts, I really, ***deeply***, love books.

## ✨ Features

* Interactive star rating system
* Sort books by: Recency, title, and the aforementioned star rating
* Fetch book data via Google Books API (ISBN lookup)
* Subtle hover animations for a more dynamic UI

## 🛠️ Tech Stack

* Node.js + Express
* EJS templating
* PostgreSQL
* Vanilla CSS

## 🚧 Future Ideas

This project is very open to iteration. Some ideas I’d like to explore:

* Reading status enhancements:

  - “In progress”

  - “Abandoned” (realistically… a necessary category)

  - “Tried to read” (we all have those)

* Language tags (I enjoy reading across different languages)

* Placeholder cover image when none is available

* Automatically hiding “cover preview” text when an image loads

* General CSS cleanup and standardization (right now it’s very much “try things and see what works”)

## ⚙️ Setup

1. Create a PostgreSQL database called `bookshelf`

2. Run the schema:
`bash`
`psql -U your_user -d bookshelf -f db/init.sql`

3. Add your .env:
`DATABASE_URL=postgresql://username:password@localhost:5432/bookshelf`

4. Start the app:
`node index.js`

## 🙏 Credits

* Background pattern by [Pattern Monster](https://pattern.monster).
* Book covers via [Google Books API](https://developers.google.com/books) (and additional sources where needed).

## 💭 Final Thoughts

This project was as much about learning as it was about building something personal. There are things I’d refactor and polish further, but it already does what I wanted: give my reading history a home that feels a bit more intentional than a notes app.

And next time… maybe I’ll actually build that karaoke list ;)
