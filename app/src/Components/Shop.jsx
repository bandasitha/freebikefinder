import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Shop.css';

export default function Shop({ asset }) {
  const { id } = useParams();
  const [shop, setShop] = useState([]);

  useEffect(() => {
    fetch(`https://freebikefinder.herokuapp.com/${asset}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShop(data);
      });
  }, [asset, id]);

  return (
    <div className='shop'>
      <h1>{shop.name}</h1>
      <h3>{shop.address}</h3>
      <p>
        <a href={shop.website}>{shop.website}</a>
      </p>
      <p>{shop.phone}</p>
      <p>{shop.email}</p>
    </div>
  );
}

Shop.propTypes = {
  asset: PropTypes.string.isRequired,
};
