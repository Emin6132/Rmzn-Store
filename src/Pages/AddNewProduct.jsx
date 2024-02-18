import React, { useState } from 'react'
import '../Css/AddNewProduct.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { db, database } from "../config/firebase"
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

const AddNewProduct = () => {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productNumber, setProductNumber] = useState("")
  const [productCompany, setProductCompany] = useState("")
  const [productColor, setProductColor] = useState("")
  const [productWhom, setProductWhom] = useState("Unisex")
  const [productMainImg, setProductMainImg] = useState("")
  const [productOtherImgOne, setProductOtherImgOne] = useState("")
  const [productOtherImgTwo, setProductOtherImgTwo] = useState("")
  const [productOtherImgThree, setProductOtherImgThree] = useState("")
  const [productOtherImgFour, setProductOtherImgFour] = useState("")
  const [productOtherImgFive, setProductOtherImgFive] = useState("")
  const [exampleCardView, setExampleCardView] = useState(false)
  const [productImgTypeFile, setProductImgTypeFile] = useState(true)
  const [changeTypeButtonText, setChangeTypeButtonText] = useState("URL")
  const history = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const allProductsRef = collection(db, "allProducts")
  const [questionModal, setQuestionModal] = useState(false)




  const VisibleExampleCard = (e) => {
    e.preventDefault()
    if (exampleCardView == false) {
      setExampleCardView(true)
    } else if (exampleCardView == true) {
      setExampleCardView(false)
    }
  }

  const AddNewProduct = (e) => {
    e.preventDefault()

    const nameLowerCase = productName.toLowerCase();
    const uid = database.currentUser?.uid
    if (!uid) return;
    addDoc(allProductsRef, {
      uid: uid,
      productId: uuidv4(),
      img: productMainImg,
      smallImg1: productOtherImgOne,
      smallImg2: productOtherImgTwo,
      smallImg3: productOtherImgThree,
      smallImg4: productOtherImgFour,
      smallImg5: productOtherImgFive,
      name: productName,
      bestSelling: false,
      nameLowerCase: nameLowerCase,
      price: productPrice,
      company: productCompany,
      color: productColor,
      whom: productWhom,
      shoesNumbers: selectedSizes,
      numberOfProducts: productNumber,
      amount: 1,
    })
    toast.success("Yeni Ürün Eklendi", {
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

  const AddNewProductSpecial = (e) => {
    e.preventDefault()

    const nameLowerCase = productName.toLowerCase();
    const uid = database.currentUser?.uid
    if (!uid) return;
    addDoc(allProductsRef, {
      uid: uid,
      productId: uuidv4(),
      img: productMainImg,
      smallImg1: productOtherImgOne,
      smallImg2: productOtherImgTwo,
      smallImg3: productOtherImgThree,
      smallImg4: productOtherImgFour,
      smallImg5: productOtherImgFive,
      name: productName,
      bestSelling: true,
      nameLowerCase: nameLowerCase,
      price: productPrice,
      company: productCompany,
      color: productColor,
      whom: productWhom,
      shoesNumbers: selectedSizes,
      numberOfProducts: productNumber,
      amount: 1,
    })
    toast.success("Öne Çıkan Ürünlere Ve Tüm Ürünlere Yeni Ürün Eklendi", {
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

  const OpenAddNewProductModal = (e) => {
    e.preventDefault()

    if (setProductMainImg == "" ||
      productOtherImgOne == "" ||
      productOtherImgTwo == "" ||
      productOtherImgThree == "" ||
      productOtherImgFour == "" ||
      productOtherImgFive == "" ||
      productName == "" ||
      productPrice == "" ||
      productCompany == "" ||
      productColor == "" ||
      productCompany == "" ||
      selectedSizes == "" ||
      productNumber == "") {
      toast.error("Lütfen Bütün Alanları Doldurun", {
        className: "toast-message"
      })
      return;
    } else {
      setQuestionModal(true)
      setExampleCardView(false)
    }
  }


  const productImgsTypeChange = (e) => {
    e.preventDefault()
    if (productImgTypeFile == true) {
      setProductImgTypeFile(false)
      setChangeTypeButtonText("File")
    } else if (productImgTypeFile == false) {
      setProductImgTypeFile(true)
      setChangeTypeButtonText("URL")
    }
  }


  const handleSizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(item => item !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  return (
    <div className='AddNewProductPage'>
      {questionModal && <>
        <div className='AddNewProductModal'>
          <p className='modal-question'>Yeni Eklediğiniz Ürün Öne Çıkan Ürünlere Eklensin mi ?</p>


          <div className='answer-button-container'>
            <button className='modal-answer-button' onClick={AddNewProduct}>Hayır! Sadece Tüm Ürünlere Eklensin</button>
            <button className='modal-answer-button' onClick={AddNewProductSpecial}>Evet! Öne Çıkan Ürünlere de Eklensin</button>
          </div>
        </div>
        <div className="AddNewProductModalBg"></div></>}
      <div className='add-new-product-containers'>
        <form className='add-new-product-container'>
          <h2 className='add-new-product-container-title'>Yeni Ürün Ekle</h2>
          <div className='add-new-product-mid'>
            <div className='add-new-product-images-containers'>
              <div className="new-product-input-container main-img-input-container">
                <div className='new-product-input-container-title'><button className='img-type-change-button' onClick={productImgsTypeChange}>{changeTypeButtonText}</button>  <label htmlFor="Img" className='new-product-input-container-label'>Ana Fotoğraf</label></div>
                <div className="file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductMainImg(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductMainImg(e.target.value)} />)}
                </div>
              </div>
              <div className="new-product-other-imgs-container">
                <label htmlFor="OtherImgs" className='new-product-input-container-label'>Diğer Fotoğraflar</label>
                <div class="other-file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductOtherImgOne(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductOtherImgOne(e.target.value)} />)}
                </div>
                <div className="other-file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductOtherImgTwo(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductOtherImgTwo(e.target.value)} />)}

                </div>
                <div className="other-file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductOtherImgThree(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductOtherImgThree(e.target.value)} />)}
                </div>
                <div className="other-file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductOtherImgFour(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductOtherImgFour(e.target.value)} />)}
                </div>
                <div className="other-file-input">
                  {productImgTypeFile ? (<input
                    type="file"
                    className="choose-main-img"
                    onChange={(e) => setProductOtherImgFive(URL.createObjectURL(e.target.files[0]))}
                  />
                  ) : (<input type="text" className="main-img-url" placeholder='Resim URL giriniz' onChange={(e) => setProductOtherImgFive(e.target.value)} />)}
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
                <select id="whom" className='new-product-input-container-input' onChange={(e) => setProductWhom(e.target.value)} value={productWhom}>
                  <option value="Unisex">Unisex</option>
                  <option value="Yetişkin Erkek İçin">Yetişkin Erkek İçin</option>
                  <option value="Erkek Çocuk İçin">Erkek Çocuk İçin</option>
                  <option value="Yetişkin Kadın İçin">Yetişkin Kadın İçin</option>
                  <option value="Kız Çocuk İçin">Kız Çocuk İçin</option>
                </select>
              </div>
              <div className="new-product-input-container">
                <label htmlFor="ProductTitle" className='new-product-input-container-label'>Ürün Adeti:</label>
                <input type="number" className='new-product-input-container-input' onChange={(e) => setProductNumber(e.target.value)} value={productNumber} />
              </div>
            </div>

            <div className="choose-shoes-number-table">
              {[35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5,].map(size =>
                <button
                  key={size}
                  className='shoes-number-table'
                  onClick={(e) => { e.preventDefault(), handleSizeSelection(size) }}
                  style={{ backgroundColor: selectedSizes.includes(size) ? 'black' : 'white', color: selectedSizes.includes(size) ? 'white' : 'black' }}
                >
                  {size}
                </button>
              )}
            </div>
          </div>
          <button className='add-new-product-button' onClick={OpenAddNewProductModal}>Yeni Ürünü Ekle</button>
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