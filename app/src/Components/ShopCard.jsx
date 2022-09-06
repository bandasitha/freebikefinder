import React from 'react';
import PropTypes from 'prop-types';
import './ShopCard.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ShopCard({
  shopId,
  shopName,
  shopAddress,
  shopState,
  shopPhone,
  asset,
}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>
        {
          <Card.Title>
            <a href={`../${asset.slice(0, -1)}/${shopId}`}>{shopName}</a>
          </Card.Title>
        }
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <p>{shopPhone}</p>
        </Card.Text>
        <address>{shopAddress}</address>
        <p>
          <Button href='#'>Get directions</Button>
        </p>
        {shopState ? (
          <p>
            <Card.Link href={`/${asset}/${shopState.toLowerCase()}`}>
              View all shops in {shopState}
            </Card.Link>
          </p>
        ) : (
          ''
        )}
      </Card.Body>
    </Card>
  );
}

ShopCard.propTypes = {
  shopId: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
  shopAddress: PropTypes.string.isRequired,
  shopState: PropTypes.string.isRequired,
  shopPhone: PropTypes.string.isRequired,
  asset: PropTypes.string.isRequired,
};
