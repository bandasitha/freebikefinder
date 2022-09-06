import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './Shops.css';
import ShopCard from './ShopCard';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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
  }, [endpoint]);

  return (
    <Container>
      <Row>
        {shops.map((shop, index) => {
          return (
            <ShopCard
              key={shop._id}
              shopId={shop._id}
              shopName={shop.name}
              shopAddress={shop.address}
              shopState={shop.state}
              shopPhone={shop.phone}
              asset={asset}
            />
          );
        })}
      </Row>
    </Container>
  );
}

Shops.propTypes = {
  title: PropTypes.string.isRequired,
};
