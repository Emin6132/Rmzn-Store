import { Link } from "react-router-dom"
import "../Css/Products.css"
import Hero from "../Components/Hero"
import { useBestSellingsProductsListener, useAllProductsListener, deleteAllProductsProduct, addBestSellingProducts, removeBestSellingProducts } from "../config/firebase"
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";



const Products = (props) => {
    const bestSellingProducts = useBestSellingsProductsListener();
    const allProducts = useAllProductsListener();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const clearSearchInput = () => {
        props.setSearchTerm("")
    }

    return (
        <div className="home-page">
            {/*   {props.filteredDocs.length > 0 && props.searchTerm.length < 1 && <div className="searched-products-view">
                {props.filteredDocs.map((item, index) => (
                    <div key={index} className="Card">
                        {props.adminLogin && <button className="delete-product-button"
                            onClick={() => deleteProduct(item.id)}><i className="fa-solid fa-trash-can"></i></button>}
                        <div className="Card-Top">
                            <div className="product-img-div">
                                <img src={item.img} className="product-img" />
                            </div>
                            <div className="other-imgs">
                                <img src={item.smallImg1} className="other-img" />
                                <img src={item.smallImg2} className="other-img" />
                                <img src={item.smallImg3} className="other-img" />
                                <img src={item.smallImg4} className="other-img" />
                                <img src={item.smallImg5} className="other-img" />
                            </div>
                        </div>
                        <Link to={`/${item.id}`} onClick={clearSearchInput} className="product-link">
                            <p className="product-title">{item.name}</p>
                            <p className="product-whom">{item.whom}</p>
                            <div className="product-price">₺{item.price}.9</div>
                        </Link>
                    </div>
                ))}
            </div>}
                */}

            {props.searchTerm.length > 0 && <div className="searched-products-view">
                {props.searchResults.map((item) => (
                    <div key={item.id} className="Card">
                        {props.adminLogin && <button className="delete-product-button"
                            onClick={() => deleteProduct(item.id)}><i className="fa-solid fa-trash-can"></i></button>}
                        <div className="Card-Top">
                            <div className="product-img-div">
                                <img src={item.img} className="product-img" />
                            </div>
                            <div className="other-imgs">
                                <img src={item.smallImg1} className="other-img" />
                                <img src={item.smallImg2} className="other-img" />
                                <img src={item.smallImg3} className="other-img" />
                                <img src={item.smallImg4} className="other-img" />
                                <img src={item.smallImg5} className="other-img" />
                            </div>
                        </div>
                        <Link to={`/${item.id}`} onClick={clearSearchInput} className="product-link">
                            <p className="product-title">{item.name}</p>
                            <p className="product-whom">{item.whom}</p>
                            <div className="product-price">₺{item.price}.9</div>
                        </Link>
                    </div>

                ))}
            </div>}

            {props.searchTerm.length > 0 && props.searchResults.length < 1 ? (<div className="dontFindProduct">

                Aradığınız ürün bulunamadı !!</div>) : (<></>)}



            {props.searchTerm.length == 0 && <>
                <Hero />
                <div>
                    <div className="products-container" >
                        <div className="products-container-title">
                            Öne Çıkan Ürünler
                        </div>
                        {loaded ? ((<div className="bestSellingProducts">
                            {
                                bestSellingProducts.map((product) => (
                                    <div key={product.id} className="Card">
                                        {props.adminLogin && <>
                                            <button className="delete-product-button"
                                                onClick={() => deleteAllProductsProduct(product.productId)}><i className="fa-solid fa-trash-can"></i></button>
                                            <button className="remove-product-bestSelling-button" onClick={() => removeBestSellingProducts(product.id)}
                                            >Öne Çıkan Ürünlerden Çıkar</button></>
                                        }
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
                        </div>)) : (<div className="loading"><Loading /> <div className=""> Ürünler Yükleniyor...</div></div>)}
                    </div>

                    <div className="all-products-container">
                        <h1 className="all-products-title">Tüm Ürünler</h1>

                        {loaded ? ((<div className="all-products">
                            {
                                allProducts.map((product) => (
                                    <div key={product.id} className="Card">
                                        {props.adminLogin && <> <button className="delete-product-button"
                                            onClick={() => deleteAllProductsProduct(product.productId)}><i className="fa-solid fa-trash-can"></i></button>
                                            <button className="add-product-bestSelling-button" onClick={() => addBestSellingProducts(product.id)}
                                            >Öne Çıkan Ürünlere Ekle</button>
                                            <button className="remove-product-bestSelling-button" onClick={() => removeBestSellingProducts(product.id)}
                                            >Öne Çıkan Ürünlerden Çıkar</button></>
                                        }
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
                        </div>)) : (<div className="loading"><Loading /><div className=""> Ürünler Yükleniyor...</div></div>)}
                    </div>
                </div>
            </>}
        </div>
    )
}

export default Products