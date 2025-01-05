import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    setBooks(books.filter(book => book.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Inventory</h2>
      <Link to="/addbook">
        <button>Add Book</button>
      </Link>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Sr no</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/book/${book.id}`}>
                  {book.title}
                </Link>
              </td>
              <td>{book.subtitle}</td>
              <td>{book.isbn13}</td>
              <td>${book.price}</td>
              <td>
                <Link to={`/edit/${book.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <em style={{ color: "red" }}>Click on title to see description</em>
    </div>
  );
};

export default Homepage;