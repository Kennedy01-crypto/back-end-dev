import React from "react";
import axios from "axios";
import { useEffect } from "react"; // Assuming you have a custom hook for effects

export const Books = (props) => {
  const [books, setBooks] = React.useState([]);

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
  return <div>Books</div>;
};
