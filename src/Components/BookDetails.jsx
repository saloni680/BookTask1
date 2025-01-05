import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        if (response.status === 200) {
          setBook(response.data);
        } else {
          setError('Book not found');
        }
      } catch (error) {
        console.error('Error fetching book details', error);
        setError('Book not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Subtitle:</strong> {book.subtitle}</p>
      <p><strong>ISBN:</strong> {book.isbn13}</p>
      <p><strong>Price:</strong> {book.price}</p>
      <Link to="/">Back to Inventory</Link>
    </div>
  );
};

export default BookDetails;