import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import '../Css/AddNewProduct.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const AddNewProduct = ({ setRecommendedProducts }) => {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productNumber, setProductNumber] = useState("")
  const [productCompany, setProductCompany] = useState("")
  const [productColor, setProductColor] = useState("")
  const [productWhom, setProductWhom] = useState("")
  const [productMainImg, setProductMainImg] = useState("")
  const [productOtherImgOne, setProductOtherImgOne] = useState("")
  const [productOtherImgTwo, setProductOtherImgTwo] = useState("")
  const [productOtherImgThree, setProductOtherImgThree] = useState("")
  const [productOtherImgFour, setProductOtherImgFour] = useState("")
  const [productOtherImgFive, setProductOtherImgFive] = useState("")
  const [exampleCardView, setExampleCardView] = useState(false)

  const VisibleExampleCard = (e) => {
    e.preventDefault()
    if (exampleCardView == false) {
      setExampleCardView(true)
    } else if (exampleCardView == true) {
      setExampleCardView(false)
    }
  }
  const history = useNavigate();
  
  const AddNewProduct = (e) => {
    e.preventDefault()
    setRecommendedProducts((prevState) => [...prevState, {
      id: uuidv4(),
      img: productMainImg,
      smallImg1: productOtherImgOne,
      smallImg2: productOtherImgTwo,
      smallImg3: productOtherImgThree,
      smallImg4: productOtherImgFour,
      smallImg5: productOtherImgFive,
      title: productName,
      price: productPrice,
      company: productCompany,
      color: productColor,
      whom: productWhom,
      numberOfProducts: productNumber,
      amount: 1,
    }])
    
    toast.success("Ürün Eklendi", {
      className: "toast-message"
    })
    history("/");


    setProductName("")
    setProductPrice("")
    setProductCompany("")
    setProductNumber("")
    setProductColor("")
    setProductWhom("")
    setProductMainImg("")
    setProductOtherImgOne("")
    setProductOtherImgTwo("")
    setProductOtherImgThree("")
    setProductOtherImgFour("")
    setProductOtherImgFive("")
  }
  return (
    <div className='AddNewProductPage'>
      <div className='add-new-product-containers'>
        <form className='add-new-product-container'>
          <h2 className='add-new-product-container-title'>Öne Çıkan Ürünlere Yeni Ürün Ekle</h2>
          <div className='add-new-product-mid'>
            <div className='add-new-product-images-containers'>
              <div className="new-product-input-container main-img-input-container">
                <label htmlFor="Img" className='new-product-input-container-label'>Ana Fotoğraf</label>
                <div className="file-input">
                  <input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductMainImg(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
              </div>
              <div className="new-product-other-imgs-container">
                <label htmlFor="OtherImgs" className='new-product-input-container-label'>Diğer Fotoğraflar</label>
                <div class="other-file-input">
                  <input
                    type="file"
                    className="choose-img"
                    onChange={(e) => setProductOtherImgOne(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
                <div className="other-file-input">
                  <input
                    type="file"
                    className="choose-img"
                    onChange={(e) => setProductOtherImgTwo(URL.createObjectURL(e.target.files[0]))}
                  />

                </div>
                <div className="other-file-input">
                  <input
                    type="file"
                    className="choose-img"
                    onChange={(e) => setProductOtherImgThree(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
                <div className="other-file-input">
                  <input
                    type="file"
                    className="choose-img"
                    onChange={(e) => setProductOtherImgFour(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
                <div className="other-file-input">
                  <input
                    type="file"
                    className="choose-img"
                    onChange={(e) => setProductOtherImgFive(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
              </div>
            </div>
            <div className='add-new-product-inputs-containers'>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Adı:</label>
                <input type="text" className='new-product-input-container-input' onChange={(e) => setProductName(e.target.value)} value={productName} />
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Fiyatı:</label>
                <input type="number" className='new-product-input-container-input' onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Markası:</label>
                <input type="text" className='new-product-input-container-input' onChange={(e) => setProductCompany(e.target.value)} value={productCompany} />
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Rengi:</label>
                <input type="text" className='new-product-input-container-input' onChange={(e) => setProductColor(e.target.value)} value={productColor} />
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Kim İçin:</label>
                <input type="text" className='new-product-input-container-input' onChange={(e) => setProductWhom(e.target.value)} value={productWhom} />
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Adeti:</label>
                <input type="number" className='new-product-input-container-input' onChange={(e) => setProductNumber(e.target.value)} value={productNumber} />
              </div>
            </div>
          </div>
          <button className='add-new-product-button' onClick={AddNewProduct}>Yeni Ürünü Ekle</button>
          <button className='visible-example-card-button' onClick={VisibleExampleCard}>Örnek Kart Göster</button>
        </form>

        {exampleCardView && <div className='example-new-card'>
          <div className="New-Card">
            <div className='New-Card-Top'>
              <div className="new-product-img-div">
                <img src={productMainImg} className="new-product-img" />
              </div>
              <div className="new-other-imgs">
                <img src={productOtherImgOne} className="new-other-img" />
                <img src={productOtherImgTwo} className="new-other-img" />
                <img src={productOtherImgThree} className="new-other-img" />
                <img src={productOtherImgFour} className="new-other-img" />
                <img src={productOtherImgFive} className="new-other-img" />
              </div>
            </div>
            <div className="product-link">
              <p className="product-title">{productName}</p>
              <p className="product-whom">{productWhom}</p>
              <div className="product-price">₺{productPrice}.9</div>
            </div>
          </div>
        </div>}
        <div>
        </div>
      </div>
    </div>
  )
}

export default AddNewProduct