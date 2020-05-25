import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

import api from '../../services/api';

const Home = ({ addToCart }) => {
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

  return (
    <ProductList>
      {products &&
        products.map((product) => {
          return (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button type="button" onClick={() => addToCart(product)}>
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
