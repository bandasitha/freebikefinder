import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './Shops.css';
import ShopCard from './ShopCard';

export default function Shops({}) {
  console.log('shops file...');
  const [shops, setShops] = useState([]);

  const { state } = useParams();

  console.log(state);

  const endpoint = state
    ? `https://freebikefinder.herokuapp.com/shops?state=${state}`
    : `https://freebikefinder.herokuapp.com/shops`;

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
