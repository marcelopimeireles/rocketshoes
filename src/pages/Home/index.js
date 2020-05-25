import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import { ProductList } from './styles';

import api from '../../services/api';

const Home = ({ dispatch }) => {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const response = await api.get('products');
    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, [setProducts]);

  const handleAddProduct = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  return (
    <ProductList>
      {products &&
        products.map((product) => {
          return (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button type="button" onClick={() => handleAddProduct(product)}>
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" /> 3
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          );
        })}
    </ProductList>
  );
};

export default connect()(Home);
