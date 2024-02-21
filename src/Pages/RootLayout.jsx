import Header from "../Components/Header"
import "../Css/RootLayout.css"
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";


const RootLayout = ({ selectedColor, selectedTrademark, setSelectedTrademark, setSelectedColor, uniqueColors, filteredDocs, uniqueTrademarks, searchTerm, setSearchTerm, size, setLogin, login, adminLogin, setAdminLogin, setAdminSettingModal, adminSettingModal }) => {

  const visibleAdminSettings = () => {
    if (adminSettingModal == true) {
      setAdminSettingModal(false)
    }
  }

  const SaveNewAdminValues = async (e) => {
    e.preventDefault()
    const db = getFirestore();

    if (newAdminName.length > 0) {
      await updateDoc(doc(db, "adminInfos", "adminInfo"), {
        name: newAdminName,
      });
    } else if (newAdminEmail.length > 0) {
      await updateDoc(doc(db, "adminInfos", "adminInfo"), {
        email: newAdminEmail,
      });
    } else if (newAdminPassword.length > 0) {
      await updateDoc(doc(db, "adminInfos", "adminInfo"), {
        password: newAdminPassword,
      });
    }


    setAdminSettingModal(false)
  }

  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminPassword, setAdminPassword] = useState(null);
  const [adminName, setAdminName] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const db = getFirestore();

        const adminInfosRef = doc(db, "adminInfos", "adminInfo");
        const docSnap1 = await getDoc(adminInfosRef);
        if (docSnap1.exists()) {
          const adminInfosDocument = docSnap1.data();
          const adminEmail = adminInfosDocument.email;
          setAdminEmail(adminEmail);
        }

        const docSnap2 = await getDoc(adminInfosRef);
        if (docSnap2.exists()) {
          const adminInfosDocument = docSnap2.data();
          const adminPassword = adminInfosDocument.password;
          setAdminPassword(adminPassword);
        }

        const docSnap3 = await getDoc(adminInfosRef);
        if (docSnap3.exists()) {
          const adminInfosDocument = docSnap3.data();
          const adminName = adminInfosDocument.name;
          setAdminName(adminName);
        }
      } catch (error) {
        console.error("Belgeler alınamadı:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="RootLayout">
      <Header selectedColor={selectedColor} selectedTrademark={selectedTrademark} setSelectedTrademark={setSelectedTrademark} uniqueColors={uniqueColors} setSelectedColor={setSelectedColor} filteredDocs={filteredDocs} uniqueTrademarks={uniqueTrademarks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} size={size} adminSettingModal={adminSettingModal} setAdminSettingModal={setAdminSettingModal} setAdminLogin={setAdminLogin} adminLogin={adminLogin} setLogin={setLogin} login={login} />
      {adminSettingModal && <form onSubmit={SaveNewAdminValues} className="admin-settings-modal">

        <h1 className="admin-settings-modal-title">
          Yönetici Ayarları
          <div className="modal-close-button" onClick={visibleAdminSettings} ><i className="fa-solid fa-xmark modal-close-icon"></i></div>
        </h1>
        <div className="admin-settings-input-container">
          <label className="admin-settings-label">Yönetici İsmi:</label> <span>{adminName}</span> <br />
          <input type="text" className="admin-settings-input" onChange={(e) => setNewAdminName(e.target.value)} value={newAdminName} placeholder="Yeni İsim Giriniz" />
        </div>
        <div className="admin-settings-input-container">
          <label className="admin-settings-label">Yönetici Email:</label> <span>{adminEmail}</span> <br />
          <input type="text" className="admin-settings-input" onChange={(e) => setNewAdminEmail(e.target.value)} value={newAdminEmail} placeholder="Yeni Mail Giriniz" />
        </div>
        <div className="admin-settings-input-container">
          <label className="admin-settings-label">Yönetici Şifre:</label>  <span>{adminPassword}</span> <br />
          <input type="text" className="admin-settings-input" onChange={(e) => setNewAdminPassword(e.target.value)} value={newAdminPassword} placeholder="Yeni Şifre Giriniz" />
        </div>

        <button type="submit" className="save-setting-button">Ayarları kaydet</button>
      </form>}
      {adminSettingModal && <div className="modal-bg" onClick={visibleAdminSettings}>
      </div>}
      <Toaster />
      {adminSettingModal == false && <Outlet />}
    </div>
  )
}

export default RootLayout