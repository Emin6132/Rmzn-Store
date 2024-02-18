import React, { useEffect, useState } from 'react'
import '../Css/ShoppingBasket.css'
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading'
import { initializeApp } from "firebase/app";
import { getFirestore,  doc, updateDoc, getDoc } from "firebase/firestore"
import { deleteCartProduct, useCartProductsListener } from "../config/firebase"

const ShoppingBasket = ({ login }) => {
  const cartProducts = useCartProductsListener();
  const [price, setPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyAJ4zicHyKOAUv_D8f_aSjpDBbX-gc26EA",
    authDomain: "shoes-store-f904d.firebaseapp.com",
    projectId: "shoes-store-f904d",
    storageBucket: "shoes-store-f904d.appspot.com",
    messagingSenderId: "398626237302",
    appId: "1:398626237302:web:d255323cb17da96aba6857"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


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


  const increaseAmount = async (productId) => {
    try {
      const productRef = doc(db, "carts", productId); // products koleksiyonundaki belgeyi al
      const productDoc = await getDoc(productRef); // Belgeyi al
      const currentAmount = productDoc.data().amount; // Mevcut miktarı al

      // Yeni miktarı hesapla
      const newAmount = currentAmount + 1;

      // Belgeyi güncelle
      await updateDoc(productRef, { amount: newAmount });
      console.log("Amount başarıyla arttırıldı.");
    } catch (error) {
      console.error("Amount artırılırken bir hata oluştu:", error);
    }
  };

  const decreaseAmount = async (productId) => {
    try {
      const productRef = doc(db, "carts", productId); // products koleksiyonundaki belgeyi al
      const productDoc = await getDoc(productRef); // Belgeyi al
      const currentAmount = productDoc.data().amount; // Mevcut miktarı al

      // Azaltma işlemi için mevcut miktarın kontrolü yapılabilir
      if (currentAmount > 1) {
        const newAmount = currentAmount - 1;

        // Belgeyi güncelle
        await updateDoc(productRef, { amount: newAmount });
        console.log("Amount başarıyla azaltıldı.");
      } else {
        console.log("Amount zaten en düşük değerde.");
      }
    } catch (error) {
      console.error("Amount azaltılırken bir hata oluştu:", error);
    }
  };

  return (
    <div className='shopping-basket-page'>
      <div className="shopping-basket-container">
        <h1 className='shopping-basket-container-title'>Sepetiniz</h1>
        {login == true && <div>{cartProducts.length == 0 && <p className='dont-have-product-msg'>Sepetinizde hiç ürün yok!!</p>}</div>}
        {login == false && <p className='dont-have-product-msg'>Sepetinize ürün ekleyebilmek için giriş yapmanız lazım!!  <Link to="/login" className='Link'>Giriş Yap</Link></p>}
        <div className={`${cartProducts.length > 1 ? "basket-in-products-container" : ""}`}>

          {cartProducts.length > 0 && <div>
            {loaded ? (<div>
              {cartProducts.map((item) => (
                <div className='product-card' key={item.id}>
                  <div className='product-card-left'>
                    <img src={item.img} className='product-card-img' />
                    <div className='product-card-mid'>
                      <span>
                        <p className='product-card-title'>{item.name}</p>
                        <span>{item.selectedSizes.map(size =>
                          <span key={size} className='product-selected-sizes' >{size}</span>)}</span>
                      </span>
                      <p className='product-card-price'>₺{item.price}</p>
                    </div>
                  </div>
                  <div className="product-card-right">
                    <button className='remove-product-button' onClick={() => deleteCartProduct(item.id)}> Sepetten Çıkar </button>
                    <div className="amount-container">
                    <button className='decrease-button amount-change-button' onClick={() => decreaseAmount(item.id)}> - </button>
<div className='product-amount'>{item.amount}</div>
<button className='increase-button amount-change-button' onClick={() => increaseAmount(item.id)}> + </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>) : (<div className="loading"><Loading /> Sepetteki Ürünler Yükleniyor...</div>)}

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