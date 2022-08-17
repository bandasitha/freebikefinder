import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ShopCard.css';

export default function ShopCard({ title, children }) {
  useEffect(() => {
    fetch(`http://localhost:5000/shops`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className='shop'>
      <h2 className='carousel__name'>{title}</h2>
      <div className='carousel__content'>Data goes here</div>
    </div>
  );
}

ShopCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};
