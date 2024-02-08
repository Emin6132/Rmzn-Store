import { Link } from "react-router-dom"
import "../Css/Products.css"
import Hero from "../Components/Hero"
import { useProductsListener, deleteProduct, } from "../config/firebase"
import { useState, useEffect } from "react";


const Products = (props) => {
    const bestSellingProducts = useProductsListener();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          console.log('SetTimeout çalıştı!');
          setLoaded(true); 
        }, 1700); 
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <div className="home-page">
            <Hero />
            {loaded ? (            <div className="products-container" >
                <div className="products-container-title">
                    Öne Çıkan Ürünler
                </div>
                <div className="products">
                    {
                        bestSellingProducts.map((product) => (
                            <div key={product.id} className="Card">
                                {props.adminLogin && <button className="delete-product-button"
                                    onClick={() => deleteProduct(product.id)}><i className="fa-solid fa-trash-can"></i></button>}
                                <div className="Card-Top">
                                    <div className="product-img-div">
                                        <img src={product.img} className="product-img" />
                                    </div>
                                    <div className="other-imgs">
                                        <img src={product.smallImg1} className="other-img" />
                                        <img src={product.smallImg2} className="other-img" />
                                        <img src={product.smallImg3} className="other-img" />
                                        <img src={product.smallImg4} className="other-img" />
                                        <img src={product.smallImg5} className="other-img" />
                                    </div>
                                </div>
                                <Link to={`/${product.id}`} className="product-link">
                                    <p className="product-title">{product.name}</p>
                                    <p className="product-whom">{product.whom}</p>
                                    <div className="product-price">₺{product.price}.9</div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>) : (<div className="loading">Ürünler Yükleniyor...</div>)}
        </div>
    )
}

export default Products