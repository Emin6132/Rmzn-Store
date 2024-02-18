import './App.css'
import Products from "./Products/Products"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './Pages/RootLayout'
import ProductsDetail from './Products/ProductsDetail'
import Error from './Pages/Error'
import { useEffect, useState } from 'react'
import ShoppingBasket from './Pages/ShoppingBasket'
import RegisterLogin from './Pages/RegisterLogin'
import ForgotPassword from './Pages/ForgotPassword'
import AddNewProduct from './Pages/AddNewProduct'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, where, query, onSnapshot } from "firebase/firestore"


function App() {
  /*  const [recommendedProducts, setRecommendedProducts] = useState([
      {
        id: "1",
        img: "https://titan22.com/cdn/shop/products/DD8959-100-E_1082x.png?v=1649821426",
        smallImg1: "https://titan22.com/cdn/shop/products/CW2288-111-C_1082x.png?v=1677862884",
        smallImg2: "https://titan22.com/cdn/shop/products/CW2288-111-D_1082x.png?v=1677862905",
        smallImg3: "https://titan22.com/cdn/shop/products/DD8959-100-E_1082x.png?v=1649821426",
        smallImg4: "https://titan22.com/cdn/shop/products/CW2288-111-A.png?v=1677862917&width=200",
        smallImg5: "https://titan22.com/cdn/shop/products/CW2288-111-B_1082x.png?v=1677862912",
        title: "Nike Air Force 1 '07 'Triple White",
        price: 3399,
        company: "Nike",
        color: "white",
        category: "sneakers",
        whom: "Unisex",
        numberOfProducts: "3",
        shoesSize: "0",
        amount: 1,
      },
      {
        id: "2",
        img: "https://titan22.com/cdn/shop/files/FB9933-100-E_1082x.png?v=1705888992",
        smallImg1: "https://titan22.com/cdn/shop/files/FB9933-100-1_1082x.png?v=1700188867",
        smallImg2: "https://titan22.com/cdn/shop/files/FB9933-100-B_1082x.png?v=1705888997",
        smallImg3: "https://titan22.com/cdn/shop/files/FB9933-100-D_1082x.png?v=1705888995",
        smallImg4: "https://titan22.com/cdn/shop/files/FB9933-100-E_1082x.png?v=1705888992",
        smallImg5: "",
        title: "Air Jordan 1 Low '85 'Neutral Grey'",
        price: 7299,
        company: "Nike",
        color: "white",
        category: "sneakers",
        whom: "Unisex",
        numberOfProducts: "0",
        shoesSize: "0",
        amount: 1,
      },
      {
        id: "3",
        img: "https://titan22.com/cdn/shop/products/DD1391-103-E_7eb3375d-54b6-46a8-941d-9ef278b231a9_1082x.png?v=1675746592",
        smallImg1: "https://titan22.com/cdn/shop/products/DD1391-103-A_fb453172-edaa-4287-9796-8f244fa1c092_1082x.png?v=1675746610",
        smallImg2: "https://titan22.com/cdn/shop/products/DD1391-103-B_26cdddc4-3d1a-41be-96e1-1ec261eccb4c_1082x.png?v=1675746606",
        smallImg3: "https://titan22.com/cdn/shop/products/DD1391-103-E_7eb3375d-54b6-46a8-941d-9ef278b231a9_1082x.png?v=1675746592",
        smallImg4: "https://titan22.com/cdn/shop/products/DD1391-103-D_8969a95b-0efb-4b84-96a2-fa8051d1fe83_1082x.png?v=1675746676",
        smallImg5: "https://titan22.com/cdn/shop/products/DD1391-103-F_e98091e9-f354-4ea4-82b0-045fb9abb757_1082x.png?v=1675746623",
        title: "Nike Dunk Low 'Grey Fog'",
        price: 4599,
        company: "Nike",
        color: "gray",
        category: "sneakers",
        whom: "Erkek Ayakkabısı",
        numberOfProducts: "1",
        shoesSize: "0",
        amount: 1,
      },
      {
        id: "4",
        img: "https://titan22.com/cdn/shop/files/DZ5485-701-E_1082x.png?v=1703233271",
        smallImg1: "https://titan22.com/cdn/shop/files/DZ5485-701-A_1082x.png?v=1703233271",
        smallImg2: "https://titan22.com/cdn/shop/files/DZ5485-701-B_1082x.png?v=1703233271",
        smallImg3: "https://titan22.com/cdn/shop/files/DZ5485-701-E_1082x.png?v=1703233271",
        smallImg4: "https://titan22.com/cdn/shop/files/DZ5485-701-D_1082x.png?v=1703233271",
        smallImg5: "https://titan22.com/cdn/shop/files/DZ5485-701-F_1082x.png?v=1703233270",
        title: "Air Jordan 1 Retro High OG 'Yellow Ochre'",
        price: 5299,
        company: "Nike",
        color: "yellow",
        category: "sneakers",
        whom: "Erkek Ayakkabısı",
        numberOfProducts: "42",
        shoesSize: "0",
        amount: 1,
      },
      {
        id: "5",
        img: "https://titan22.com/cdn/shop/files/CT8532-140-E_1082x.png?v=1702627401",
        smallImg1: "https://titan22.com/cdn/shop/files/CT8532-140-A_1082x.png?v=1702627402",
        smallImg2: "https://titan22.com/cdn/shop/files/CT8532-140-B_1082x.png?v=1702627401",
        smallImg3: "https://titan22.com/cdn/shop/files/CT8532-140-E_1082x.png?v=1702627401",
        smallImg4: "https://titan22.com/cdn/shop/files/CT8532-140-D_1082x.png?v=1702627402",
        smallImg5: "https://titan22.com/cdn/shop/files/CT8532-140-F_1082x.png?v=1702627401",
        title: "Air Jordan 3 Retro 'Midnight Navy'",
        price: 6099,
        company: "Nike",
        color: "white",
        category: "sneakers",
        whom: "Unisex",
        numberOfProducts: "29",
        shoesSize: "0",
        amount: 1,
      },
    ])
 

  useEffect(() => {
    const data = window.localStorage.getItem('recommendedProducts');
    if (data !== null) setRecommendedProducts(JSON.parse(data))
  }, []);

  useEffect(() => {
    localStorage.setItem("recommendedProducts", JSON.stringify(recommendedProducts));
  }, [recommendedProducts]);



   const [products, setProducts] = useState([
    {
      id: "1",
      img: "/airforce.png",

      title: "Nike Air Monarch IV",
      price: "3000₺",
      company: "Nike",
      color: "white",
      category: "sneakers",
      whom: "Unisex",
    },
    {
      id: "2",
      img: "/airforce.png", title: "Adidas Niteball",
      price: "4000",
      company: "Adidas",
      color: "black",
      category: "sneakers",
      whom: "Unisex",
    },
    {
      id: "3",
      img: "/airforce.png", title: "Adidas Niteball",
      price: "4000",
      company: "Adidas",
      color: "black",
      category: "sneakers",
      whom: "Erkek Ayakkabısı",
    },
    {
      id: "4",
      img: "/airforce.png", title: "Adidas Niteball",
      price: "4000",
      company: "Adidas",
      color: "black",
      category: "sneakers",
      whom: "Kadın Ayakkabısı",
    },
    {
      id: "5",
      img: "/airforce.png", title: "Adidas Niteball",
      price: "4000",
      company: "Adidas",
      color: "black",
      category: "sneakers",
      whom: "Unisex",
    },])
    */
  const [login, setLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [adminName, setAdminName] = useState("Admin")
  const [adminEmail, setAdminEmail] = useState("admin123456@gmail.com")
  const [adminPassword, setAdminPassword] = useState("admin123456")
  const [adminSettingModal, setAdminSettingModal] = useState(false)

  useEffect(() => {
    const data = window.localStorage.getItem('adminEmail');
    if (data !== null) setAdminEmail(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('adminEmail', JSON.stringify(adminEmail));
  }, [adminEmail]);


  useEffect(() => {
    const data = window.localStorage.getItem('adminName');
    if (data !== null) setAdminName(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('adminName', JSON.stringify(adminName));
  }, [adminName]);

  useEffect(() => {
    const data = window.localStorage.getItem('adminPassword');
    if (data !== null) setAdminPassword(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('adminPassword', JSON.stringify(adminPassword));
  }, [adminPassword]);

  useEffect(() => {
    const data = window.localStorage.getItem('loginValue');
    if (data !== null) setLogin(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('loginValue', JSON.stringify(login));
  }, [login]);


  useEffect(() => {
    const data = window.localStorage.getItem('adminLoginValue');
    if (data !== null) setAdminLogin(JSON.parse(data))
  }, []);

  useEffect(() => {
    window.localStorage.setItem('adminLoginValue', JSON.stringify(adminLogin));
  }, [adminLogin]);


  const firebaseConfig = {
    apiKey: "AIzaSyAJ4zicHyKOAUv_D8f_aSjpDBbX-gc26EA",
    authDomain: "shoes-store-f904d.firebaseapp.com",
    projectId: "shoes-store-f904d",
    storageBucket: "shoes-store-f904d.appspot.com",
    messagingSenderId: "398626237302",
    appId: "1:398626237302:web:d255323cb17da96aba6857"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const [uniqueColors, setUniqueColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("")
  const [uniqueTrademarks, setUniqueTrademarks] = useState([]);
  const [selectedTrademark, setSelectedTrademark] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Trademark alanına göre benzersiz değerleri al
        const trademarksSnapshot = await getDocs(collection(db, "allProducts")); // Firestore koleksiyonunuzun adını belirtin
        const trademarksMap = new Map(); // Trademarkleri depolamak için bir Map oluşturun
        trademarksSnapshot.forEach(doc => {
          const trademark = doc.data().company; // Belgeden trademark'ü alın
          if (!trademarksMap.has(trademark)) { // Eğer trademark daha önce eklenmediyse
            trademarksMap.set(trademark, true); // Trademark'leri Map'e ekle (Anahtar olarak trademark, değer olarak true)
          }
        });
        const uniqueTrademarksArray = Array.from(trademarksMap.keys()); // Map'teki benzersiz trademark'leri diziye dönüştür
        setUniqueTrademarks(uniqueTrademarksArray);

        // Color alanına göre benzersiz değerleri al
        const colorsSnapshot = await getDocs(collection(db, "allProducts")); // Firestore koleksiyonunuzun adını belirtin
        const colorsMap = new Map(); // Renkleri depolamak için bir Map oluşturun
        colorsSnapshot.forEach(doc => {
          const color = doc.data().color; // Belgeden rengi alın
          if (!colorsMap.has(color)) { // Eğer renk daha önce eklenmediyse
            colorsMap.set(color, true); // Renkleri Map'e ekle (Anahtar olarak renk, değer olarak true)
          }
        });
        const uniqueColorsArray = Array.from(colorsMap.keys()); // Map'teki benzersiz renkleri diziye dönüştür
        setUniqueColors(uniqueColorsArray);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);


  useEffect(() => {
    const fetchFilteredDocs = async () => {
      try {
        if (selectedTrademark !== "" && selectedColor !== "") {
          // Hem trademark hem de color seçiliyse, her iki kritere de göre belgeleri filtrele
          const q = query(collection(db, "allProducts"),
            where("company", "==", selectedTrademark),
            where("color", "==", selectedColor)); // Firestore koleksiyonunuzun adını ve alanları belirtin
          const querySnapshot = await getDocs(q);
          const filteredDocsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));;
          setFilteredDocs(filteredDocsArray);
        } else if (selectedTrademark !== "") {
          // Sadece trademark seçiliyse, sadece trademark'e göre belgeleri filtrele
          const q = query(collection(db, "allProducts"),
            where("company", "==", selectedTrademark)); // Firestore koleksiyonunuzun adını ve alanları belirtin
          const querySnapshot = await getDocs(q);
          const filteredDocsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFilteredDocs(filteredDocsArray);
        } else if (selectedColor !== "") {
          // Sadece color seçiliyse, sadece renge göre belgeleri filtrele
          const q = query(collection(db, "allProducts"),
            where("color", "==", selectedColor)); // Firestore koleksiyonunuzun adını ve alanları belirtin
          const querySnapshot = await getDocs(q);
          const filteredDocsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFilteredDocs(filteredDocsArray);
        } else if (selectedColor == "" && selectedTrademark == "") {
          const q = query(collection(db, "allProducts"),
            where("company", "==", selectedTrademark),
            where("color", "==", selectedColor)); // Firestore koleksiyonunuzun adını ve alanları belirtin
          const querySnapshot = await getDocs(q);
          const filteredDocsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFilteredDocs(filteredDocsArray);
        }
      } catch (error) {
        console.error("Error fetching filtered docs:", error);
      }
    };

    fetchFilteredDocs();
  }, [selectedTrademark, selectedColor]);



  useEffect(() => {
    const fetchData = async () => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const q = query(collection(db, 'allProducts'), where('nameLowerCase', '>=', searchTermLowerCase));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(results);
      });

      return unsubscribe;
    };

    fetchData();
  }, [searchTerm]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout selectedColor={selectedColor} selectedTrademark={selectedTrademark} filteredDocs={filteredDocs} uniqueTrademarks={uniqueTrademarks} uniqueColors={uniqueColors} setSelectedColor={setSelectedColor} setSelectedTrademark={setSelectedTrademark} searchTerm={searchTerm} adminSettingModal={adminSettingModal} setSearchTerm={setSearchTerm} setAdminSettingModal={setAdminSettingModal} adminName={adminName} setAdminName={setAdminName} adminEmail={adminEmail} setAdminEmail={setAdminEmail} adminPassword={adminPassword} setAdminPassword={setAdminPassword} setAdminLogin={setAdminLogin} adminLogin={adminLogin} setLogin={setLogin} login={login} />}>
          <Route path='/' element={<Products filteredDocs={filteredDocs} setSearchTerm={setSearchTerm} searchTerm={searchTerm} adminLogin={adminLogin} searchResults={searchResults} />} />
          <Route path='/:productId' element={<ProductsDetail login={login} />} />
          <Route path='/shopping-basket' element={<ShoppingBasket login={login} />} />
          {adminLogin && <Route path='/add-product' element={<AddNewProduct />} />}
          {adminLogin == false && <Route path='/add-product' element={<Error />} />}
          {login == false && <Route path='/login' element={<RegisterLogin adminName={adminName} adminEmail={adminEmail} adminPassword={adminPassword} setAdminLogin={setAdminLogin} setLogin={setLogin} login={login} />} />}
          {login == true && <Route path='/login' element={<Error />} />}
          <Route path="/passwordreset" element={<ForgotPassword />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
