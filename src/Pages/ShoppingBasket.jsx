import React, { useEffect, useState } from 'react'
import '../Css/ShoppingBasket.css'
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, doc, updateDoc, deleteDoc, query, where, onSnapshot,collection } from "firebase/firestore"

const ShoppingBasket = ({ login }) => {
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
  const database = getAuth(app)
  const db = getFirestore(app)


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrice = () => {
    let ans = 0;
    products.map((item) => (
      ans += item.amount * item.price
    ))
    setPrice(ans);
  }

  const [products, setProducts] = useState([]);
  const currentUser = database.currentUser; // Kullanıcı nesnesini al
  const cartProductRef = collection(db, "carts");


  useEffect(() => {
    if (!currentUser) return; // Kullanıcı oturumu olmadan işlem yapmayı önle
    const uid = currentUser.uid; // Kullanıcının UID'sini al

    // carts koleksiyonunu referans al
    const userCartQuery = query(cartProductRef, where('uid', '==', uid)); // Kullanıcının sepetini sorgula

    const unsubscribe = onSnapshot(userCartQuery, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
    });

    return () => unsubscribe(); // useEffect içinde clean-up fonksiyonu
  }, [currentUser]); // Kullanıcı değiştiğinde useEffect yeniden çalışır

  const deleteCartProduct = (productId) => {
    deleteDoc(doc(db, "carts", productId))
  }

  const increaseAmount = async (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, amount: product.amount + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);

    const db = getFirestore();
    const productRef = doc(db, 'carts', productId);
    await updateDoc(productRef, { amount: updatedProducts.find(product => product.id === productId).amount });
  };

  const decreaseAmount = async (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId && product.amount > 1) {
        return { ...product, amount: product.amount - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);

    const db = getFirestore();
    const productRef = doc(db, 'carts', productId);
    await updateDoc(productRef, { amount: updatedProducts.find(product => product.id === productId).amount });
  };

  const getProductSubtotal = (product) => {
    return product.amount * product.price;
  };



  useEffect(() => {
    handlePrice();
  })


  return (
    <div className='shopping-basket-page'>
      <div className="shopping-basket-container">
        <h1 className='shopping-basket-container-title'>Sepetiniz</h1>

        {login == true && <div>{products.length == 0 && <p className='dont-have-product-msg'>Sepetinizde hiç ürün yok!!</p>}</div>}
        {login == false && <p className='dont-have-product-msg'>Sepetinize ürün ekleyebilmek için giriş yapmanız lazım!!  <Link to="/login" className='Link'>Giriş Yap</Link></p>}
        {login == true && <>
          <div className={`${products.length > 1 ? "basket-in-products-container" : ""}`}>

            {products.length > 0 && <div>
              {loaded ? (<div>
                {products.map((item) => (
                  <div className='product-card' key={item.id}>
                    <div className='product-card-left'>
                      <img src={item.img} className='product-card-img' />
                      <div className='product-card-mid'>
                        <span>
                          <p className='product-card-title'>{item.name}</p>
                          <span>{item.selectedSizes.map(size =>
                            <span key={size} className='product-selected-sizes' >{size}</span>)}</span>
                        </span>
                        <div className='price-container'>
                          <span className='product-card-price'>₺{item.price}</span>
                          <span className='sub-total-price'>Ara Toplam: {getProductSubtotal(item)}</span>
                        </div>
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
          {loaded ? (<div>        {products.length > 0 && <div className='total-price'>
            Toplam Fiyat: ₺{price}
          </div>}
            {products.length > 0 && <button className='buy-button'>
              Satın Al
            </button>}</div>) : (<span></span>)}</>}

      </div>
    </div>
  )
}

export default ShoppingBasket