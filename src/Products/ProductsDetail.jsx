import { useNavigate, useParams } from 'react-router-dom'
import "../Css/ProductsDetail.css"
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { addProductCart, useCartProductsListener } from "../config/firebase"


const ProductsDetail = (props) => {
    const { productId } = useParams();
    const cart = useCartProductsListener();
    const firebaseConfig = {
        apiKey: "AIzaSyAJ4zicHyKOAUv_D8f_aSjpDBbX-gc26EA",
        authDomain: "shoes-store-f904d.firebaseapp.com",
        projectId: "shoes-store-f904d",
        storageBucket: "shoes-store-f904d.appspot.com",
        messagingSenderId: "398626237302",
        appId: "1:398626237302:web:d255323cb17da96aba6857"
    };

    const app = initializeApp(firebaseConfig);
    const [product, setProduct] = useState(null);
    const [changeImg, setChangeImg] = useState("")
    const db = getFirestore(app);
    const history = useNavigate();
    const [selectedSizes, setSelectedSizes] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const allProductsRef = doc(db, "allProducts", productId); // Tüm ürünler koleksiyonundan belge referansı oluştur                
                const allProductsDoc = await getDoc(allProductsRef);


                if (allProductsDoc.exists) {
                    setProduct(allProductsDoc.data());
                } else {
                    alert('Belirtilen ürün bulunamadı.');
                }
            } catch (error) {
                alert('Ürün alınamadı:', error);
            }
        };

        fetchProduct();
    }, [productId]);


    const addProductCartButton = async (productId) => {

        if (props.login == false) {
            toast.error("Sepete Eklemek İçin Giriş Yapınız", {
                className: "toast-message"
            }),
                history("/login")
        }
        else if (product.numberOfProducts == 0) {
            toast.error("Üzgünüz. Almak istediğiniz ürün tükenmiş. Başka ürünlere göz gezdirebilirsiniz.", {
                className: "toast-message"
            })
            return;
        }
        else if (selectedSizes.length == 0) {
            toast.error("Lütfen Bedeninizi Seçin", {
                className: "toast-message"
            })
            return;
        } else if (props.login == true) {
            try {
                const isProductInCart = cart.some(item => item.productId === productId && item.selectedSizes.toString() === selectedSizes.toString());
                if (isProductInCart) {
                    toast.error("Bu ürün zaten sepette bulunuyor veya numaraları aynı !!", {
                        className: "toast-message"
                    })
                    return;
                } else {
                    addProductCart(product.productId, product.img, product.name, product.price, selectedSizes), toast.success("Ürün Sepete Eklendi", {
                        className: "toast-message"
                    })
                }
            } catch (error) {
                toast.error("Ürün sepete eklenirken bir hata oluştu !!", {
                    className: "toast-message"
                })
            }
        }


    }


    const handleSizeSelection = (size) => {
        setSelectedSizes([size]);
    };


    const [zoomed, setZoomed] = useState(false);

    const onZoom = (e) => {
      const myimg = document.getElementById("myimg");
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      myimg.style.transformOrigin = `${x}px ${y}px`;
      myimg.style.transform = "scale(2.5)";
    };
  
    const offZoom = () => {
      const myimg = document.getElementById("myimg");
      myimg.style.transformOrigin = 'center center';
      myimg.style.transform = "scale(1)";
    };




    return (
        <div className='product-details-page'>
            {product ? (<div className='product-details'>
                <div className='product-details-left'>
                    <div className='main-img-div' onMouseMove={onZoom} onMouseOver={() => setZoomed(true)} onMouseLeave={() => {
                        setZoomed(false);
                        offZoom();
                    }}>
                        <img src={`${changeImg == "" ? product.img : changeImg}`} className="main-img" id="myimg"/>
                    </div>
                    <div className='small-imgs'>
                        <img src={product.smallImg1} onClick={() => setChangeImg(product.smallImg1)} className="small-img" />
                        <img src={product.smallImg2} onClick={() => setChangeImg(product.smallImg2)} className="small-img" />
                        <img src={product.smallImg3} onClick={() => setChangeImg(product.smallImg3)} className="small-img" />
                        <img src={product.smallImg4} onClick={() => setChangeImg(product.smallImg4)} className="small-img" />
                        <img src={product.smallImg5} onClick={() => setChangeImg(product.smallImg5)} className="small-img" />
                    </div>
                </div>
                <div className='product-details-right'>
                    <div className="product-details-right-detail-container">
                        <div className='product-details-right-detail-container-top'>
                            <p className='product-details-title'>
                                {product.name}
                            </p>
                            <span className='product-details-whom'>
                                {product.whom}
                            </span>
                            <p className='product-details-price'>
                                ₺{product.price}.9
                            </p>
                            {product.numberOfProducts > 0 && product.numberOfProducts < 4 && <div className='numberRemainingProducts'>
                                Son {product.numberOfProducts} ürün
                            </div>}
                            {product.numberOfProducts == 0 && <div className='product-info-msg'>
                                Ürün tükenmiş
                            </div>}
                        </div>
                        <div className='product-details-right-detail-container-bottom'>
                            <div className='choose-size-container'>
                                <p className="choose-size-title">Beden Seçiniz</p>
                                <div className='shoesNumberTable'>
                                    <div className="size-table">
                                        {product.shoesNumbers?.map(size =>
                                            <button
                                                key={size}
                                                className='size-table-box'
                                                onClick={() => handleSizeSelection(size)}
                                                style={{ backgroundColor: selectedSizes.includes(size) ? 'black' : 'white', color: selectedSizes.includes(size) ? 'white' : 'black' }}
                                            >
                                                {size}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <button onClick={() => addProductCartButton(product.productId)} className='add-basket-button'> <i className="fa-solid fa-bag-shopping add-basket-icon"></i> Sepete Ekle</button>


                        </div>
                    </div>
                </div>
            </div>) : (<p>Ürün yükleniyor...</p>)}
        </div>
    )
}

export default ProductsDetail
