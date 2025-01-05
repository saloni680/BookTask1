import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isbn13, setIsbn13] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        const book = response.data;
        setTitle(book.title);
        setSubtitle(book.subtitle);
        setIsbn13(book.isbn13);
        setPrice(book.price.replace('$', ''));
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = { title, subtitle, isbn13, price };
    await axios.put(`http://localhost:3000/books/${id}`, updatedBook);
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Subtitle:</label>
          <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="nnumber" value={isbn13} onChange={(e) => setIsbn13(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={`$${price}`} // Display the price with a dollar sign
            onChange={(e) => setPrice(e.target.value.replace('$', ''))} // Remove dollar sign for state
            required/>
          </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;