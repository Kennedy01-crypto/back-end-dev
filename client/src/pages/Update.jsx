import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Assuming you're using react-router for navigation

export const Update = () => {
  const [book, setBooks] = React.useState({
    title: "",
    desc: "",
    cover: "",
    price: "",
  });
  const [loading, setLoading] = React.useState(true);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate(); // Assuming you're using react-router for navigation
  const location = useLocation(); // Get the current location to extract the book ID from the URL
  const bookId = location.pathname.split("/")[2]; // Extracting the book ID from the URL

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/books/" + bookId
        );
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching book details:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Submitting book update:", book);
    // Here you would typically send the book data to your backend
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      console.log(
        "Book updated successfully: " +
          book.title +
          " with price: " +
          book.price +
          " and description: " +
          book.desc +
          " and cover: " +
          book.cover
      );
    } catch (err) {
      console.error("Error updating book:", err.message);
    } finally {
      navigate("/"); // Redirect to the books page after updating a book
    }
  };

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Update Book
      </h1>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Book Title"
            onChange={handleChange}
            value={book.title}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block mb-2 font-semibold text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="desc"
            name="desc"
            required
            placeholder="Book Description"
            onChange={handleChange}
            value={book.desc}
            className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="cover"
            className="block mb-2 font-semibold text-gray-700"
          >
            Cover URL:
          </label>
          <input
            type="url"
            id="cover"
            name="cover"
            required
            placeholder="Book Cover URL"
            onChange={handleChange}
            value={book.cover}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 font-semibold text-gray-700"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="Book Price"
            onChange={handleChange}
            value={book.price}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Update Book
        </button>
      </form>
    </main>
  );
};
