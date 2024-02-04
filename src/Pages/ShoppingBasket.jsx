import React, { useEffect, useState } from 'react'
import '../Css/ShoppingBasket.css'

const ShoppingBasket = ({ setShoppingBasket, shoppingBasket, size, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    shoppingBasket.map((item) => (
      ans += item.amount * item.price
    ))
    setPrice(ans);
  }

  const handleRemove = (id) => {
    const arr = shoppingBasket.filter((item) => item.id !== id);
    setShoppingBasket(arr);
    shoppingBasket.map((item) => (
      item.amount = 1
    ))
    // handlePrice();
  }

  useEffect(() => {
    handlePrice();
  })

  return (
    <div className='shopping-basket-page'>
      <div className="shopping-basket-container">
        <h1 className='shopping-basket-container-title'>Sepetiniz</h1>
        {size == 0 && <p className='dont-have-product-msg'>Sepetinizde hiç ürün yok!!</p>}
        <div className={`${size > 1 ? "basket-in-products-container" : ""}`}>


          {shoppingBasket.map((item) => (
            <div className='product-card' key={item.id}>
              <div className='product-card-left'>
                <img src={item.img} className='product-card-img' />
                <div className='product-card-mid'>
                  <p className='product-card-title'>{item.title}</p>
                  <p className='product-card-price'>₺{item.price}</p>
                </div>
              </div>
              <div className="product-card-right">
                <button className='remove-product-button' onClick={() => handleRemove(item.id)}> Ürünü Sil </button>
                <div className="amount-container">
                  <button className='decrease-button amount-change-button' onClick={() => handleChange(item, -1)}>-</button>
                  <div className='product-amount'>{item.amount}</div>
                  <button className='increase-button amount-change-button' onClick={() => handleChange(item, +1)}>+</button>
                </div>
              </div>
            </div>
          ))}


        </div>
        {size > 0 && <div className='total-price'>
          Toplam Fiyat: ₺{price}
        </div>}
        {size > 0 && <button className='buy-button'>
          Satın Al
        </button>}
      </div>
    </div>
  )
}

export default ShoppingBasket