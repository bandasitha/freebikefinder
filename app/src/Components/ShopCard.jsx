import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ShopCard.css';

export default function ShopCard({ title, children }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/shops`)
      .then((response) => response.json())
      .then((data) => {
        setShops(data);
      });
  }, []);

  return (
    <div className='shop'>
      <div className='carousel__content'>
        {shops.map((shop, index) => {
          return (
            <div>
              <h2>{shop.name}</h2>
              <p>{shop.address}</p>
              <p>{shop.phone}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ShopCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};
