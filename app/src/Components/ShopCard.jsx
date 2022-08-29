import React from 'react';
import PropTypes from 'prop-types';
import './ShopCard.css';

export default function ShopCard({ shopId, shopName, shopAddress, shopState }) {
  return (
    <div className='shop'>
      <h2>
        <a href={`../shop/${shopId}`}>{shopName}</a>
      </h2>
      <address>{shopAddress}</address>
      <p>
        State = <a href={`./shops/${shopState}`}>{shopState}</a>
      </p>
    </div>
  );
}

ShopCard.propTypes = {};
