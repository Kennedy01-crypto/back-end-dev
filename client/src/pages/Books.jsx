import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import { useEffect } from "react"; // Assuming you have a custom hook for effects

export const Books = (props) => {
  const [books, setBooks] = React.useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      console.log("Book deleted successfully with ID:", id);
      window.location.reload(); // Reload the page to reflect changes
    } catch (err) {
      console.error("Error deleting book:", err.message);
    }
  };
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        console.log(response.data);
        console.log("Books fetched successfully");
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        // Any cleanup or final actions can be done here
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Jim Bookshop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {book.title}
            </h2>
            <p className="text-gray-700 mb-4">{book.desc}</p>
            <span className="text-lg font-bold text-indigo-600">
              ${book.price}
            </span>
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Delete
            </button>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
              <Link to="/update">Update</Link>{" "}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
          <Link to="/add">Add New Book</Link>
        </button>
      </div>
    </div>
  );
};
