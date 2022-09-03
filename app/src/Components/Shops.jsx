import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './Shops.css';
import ShopCard from './ShopCard';

export default function Shops({ asset }) {
  const [shops, setShops] = useState([]);

  const { state } = useParams();

  const endpoint = state
    ? `http://localhost:8000/${asset}?state=${state}`
    : `http://localhost:8000/${asset}`;

  useEffect(() => {
    fetch(endpoint)
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
            <ShopCard
              key={shop._id}
              shopId={shop._id}
              shopName={shop.name}
              shopAddress={shop.address}
              shopState={shop.state}
            />
          );
        })}
      </div>
    </div>
  );
}

Shops.propTypes = {
  title: PropTypes.string.isRequired,
};
