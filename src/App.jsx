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
  const [login, setLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [adminSettingModal, setAdminSettingModal] = useState(false)

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
