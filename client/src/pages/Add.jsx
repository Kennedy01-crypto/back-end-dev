import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

export const Add = () => {
  const [book, setBooks] = React.useState({
    title: "",
    desc: "",
    cover: "",
    price: "",
  });
  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(book);

  const navigate = useNavigate(); // Assuming you're using react-router for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the book data to your backend
    try {
      await axios.post("http://localhost:8800/books", book);
      console.log(
        "Book added successfully" +
          book.title +
          " with price: " +
          book.price +
          " and description: " +
          book.desc +
          " and cover: " +
          book.cover
      );
      navigate("/"); // Redirect to the books page after adding a book
    } catch (err) {
      console.error("Error adding book:", err);
    } finally {
      // Any cleanup or final actions can be done here
    }
  };

  return (
    <main>
      <h1>Add New Book</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Book Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            required
            placeholder="Book Description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="cover">Cover URL:</label>
          <input
            type="url"
            id="cover"
            name="cover"
            required
            placeholder="Book Cover URL"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="Book Price"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add Book
        </button>
      </form>
    </main>
  );
};
