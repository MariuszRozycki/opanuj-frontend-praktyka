import React, { useContext } from 'react';

import { Product as ProductType } from '../types/Product';
import { CartContext } from '../contexts/CartContext';
import { BsPlus } from 'react-icons/bs';

const AddProductBtnHome = ({ product }: { product: ProductType }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product)}>
      <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
        <BsPlus className="text-3xl" />
      </div>
    </button>
  );
};

export default AddProductBtnHome;
