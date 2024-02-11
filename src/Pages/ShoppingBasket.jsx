import React, { useEffect, useState } from 'react'
import '../Css/ShoppingBasket.css'
import { useCartProductsListener, deleteCartProduct,  } from "../config/firebase"
import { Link } from 'react-router-dom';

const ShoppingBasket = ({ handleChange , login}) => {
  const cartProducts = useCartProductsListener();
  const [price, setPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrice = () => {
    let ans = 0;
    cartProducts.map((item) => (
      ans += item.amount * item.price
    ))
    setPrice(ans);
  }


  useEffect(() => {
    handlePrice();
  })

  return (
    <div className='shopping-basket-page'>
      <div className="shopping-basket-container">
        <h1 className='shopping-basket-container-title'>Sepetiniz</h1>
        {loaded == true || login == true && <div>{cartProducts.length == 0 && <p className='dont-have-product-msg'>Sepetinizde hiç ürün yok!!</p>}</div>}
        {login == false && <p className='dont-have-product-msg'>Sepetinize ürün ekleyebilmek için giriş yapmanız lazım!!  <Link to="/login" className='Link'>Giriş Yap</Link></p>}
        <div className={`${cartProducts.length > 1 ? "basket-in-products-container" : ""}`}>

          {cartProducts.length > 0 && <div>
            {loaded ? (<div>
              {cartProducts.map((item) => (
                <div className='product-card' key={item.id}>
                  <div className='product-card-left'>
                    <img src={item.img} className='product-card-img' />
                    <div className='product-card-mid'>
                      <p className='product-card-title'>{item.name}</p>
                      <p className='product-card-price'>₺{item.price}</p>
                    </div>
                  </div>
                  <div className="product-card-right">
                    <button className='remove-product-button' onClick={() => deleteCartProduct(item.id)}> Sepetten Çıkar </button>
                    <div className="amount-container">
                      <button className='decrease-button amount-change-button' onClick={() => handleChange(item, -1)}>-</button>
                      <div className='product-amount'>{item.amount}</div>
                      <button className='increase-button amount-change-button' onClick={() => handleChange(item, +1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>) : (<div className="loading">Sepetteki Ürünler Yükleniyor...</div>)}

          </div>}






        </div>
        {loaded ? (<div>        {cartProducts.length > 0 && <div className='total-price'>
          Toplam Fiyat: ₺{price}
        </div>}
          {cartProducts.length > 0 && <button className='buy-button'>
            Satın Al
          </button>}</div>) : (<span></span>)}
      </div>
    </div>
  )
}

export default ShoppingBasket