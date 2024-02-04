import { useNavigate, useParams } from 'react-router-dom'
import "../Css/ProductsDetail.css"
import { useState } from 'react';
import toast from 'react-hot-toast';


const ProductsDetail = (props) => {
    const { productId } = useParams();
    const product = props.recommendedProducts.find((product) => product.id === productId);
    const { img, smallImg1, smallImg2, smallImg3, smallImg4, smallImg5, title, price, numberOfProducts, shoesSize } = product;
    const [changeImg, setChangeImg] = useState(img)
    const [numberWarning, setNumberWarning] = useState(false)
    const [sizeNumber, setSizeNumber] = useState(shoesSize)
    const [dontHaveImg, setDontHaveImg] = useState(false)
    const history = useNavigate();

    const addBasketButton = () => {
        if (props.login == false) {
            history("/login")
            toast.error("Alışveriş yapmak için sitemize giriş yapınız!!", {
                className: "toast-message"
            })
        } else {
            if (numberOfProducts == 0) {
                toast.warning("Üzgünüz. Almak istediğiniz ürün tükenmiş.", {
                    className: "toast-message"
                })
                return;
            }
            else if (sizeNumber < 35) {
                setNumberWarning(true)
                return;
            } else if (sizeNumber > 34) {
                setNumberWarning(false)
                props.handleClick(product)
            }
        }
    }

    const Img5 = () => {
        if (smallImg5 == "") {
            setDontHaveImg(true)

        } else {
            setChangeImg(smallImg5)
        }
    }

    return (
        <div className='product-details'>
            <div className='product-details-left'>
                <div className='main-img-div'>
                    <img src={changeImg} className="main-img" />
                </div>
                <div className='small-imgs'>
                    <img src={smallImg1} onClick={() => setChangeImg(smallImg1)} className="small-img" />
                    <img src={smallImg2} onClick={() => setChangeImg(smallImg2)} className="small-img" />
                    <img src={smallImg3} onClick={() => setChangeImg(smallImg3)} className="small-img" />
                    <img src={smallImg4} onClick={() => setChangeImg(smallImg4)} className="small-img" />
                    <img src={smallImg5} onClick={Img5} className={`${dontHaveImg ? "dont-have-small-img" : "small-img"}`} />
                </div>
            </div>
            <div className='product-details-right'>
                <div className="product-details-right-detail-container">
                    <div className='product-details-right-detail-container-top'>
                        <p className='product-details-title'>
                            {title}
                        </p>
                        <p className='product-details-price'>
                        ₺{price}.9
                        </p>
                        {numberOfProducts > 0 && numberOfProducts < 4 && <div className='numberRemainingProducts'>
                            Son {numberOfProducts} ürün
                        </div>}
                        {numberOfProducts == 0 && <div className='product-info-msg'>
                            Ürün tükenmiş
                        </div>}
                    </div>
                    <div className='product-details-right-detail-container-bottom'>
                        <div className='choose-size-container'>
                            <p className="choose-size-title">Beden Seçiniz</p>
                            <div className='size-table'>
                                <div className={`${sizeNumber == 35 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(35) || setNumberWarning(false)}>35</div>
                                <div className={`${sizeNumber == 36 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(36) || setNumberWarning(false)}>36</div>
                                <div className={`${sizeNumber == 37 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(37) || setNumberWarning(false)}>37</div>
                                <div className={`${sizeNumber == 38 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(38) || setNumberWarning(false)}>38</div>
                                <div className={`${sizeNumber == 39 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(39) || setNumberWarning(false)}>39</div>
                                <div className={`${sizeNumber == 40 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(40) || setNumberWarning(false)}>40</div>
                                <div className={`${sizeNumber == 41 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(41) || setNumberWarning(false)}>41</div>
                                <div className={`${sizeNumber == 42 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(42) || setNumberWarning(false)}>42</div>
                                <div className={`${sizeNumber == 43 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(43) || setNumberWarning(false)}>43</div>
                                <div className={`${sizeNumber == 44 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(44) || setNumberWarning(false)}>44</div>
                                <div className={`${sizeNumber == 45 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(45) || setNumberWarning(false)}>45</div>
                                <div className={`${sizeNumber == 46 ? "size-table-box-active" : "size-table-box"}`} onClick={() => setSizeNumber(46) || setNumberWarning(false)}>46</div>
                            </div>
                            {numberWarning && <div className='number-warning-msg'>Lütfen bir numara seçiniz</div>}
                        </div>
                        <button onClick={addBasketButton} className='add-basket-button'> <i className="fa-solid fa-bag-shopping add-basket-icon"></i> Sepete Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsDetail