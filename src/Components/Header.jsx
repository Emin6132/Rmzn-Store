import { signOut } from "firebase/auth";
import "../Css/Header.css"
import { Link } from "react-router-dom"
import { database } from '../config/firebase';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useCartProductsListener } from "../config/firebase"
import React, { useState } from 'react';

const Header = ({ selectedColor, selectedTrademark, setSelectedTrademark, setSelectedColor, uniqueColors, filteredDocs, uniqueTrademarks, searchTerm, setSearchTerm, adminLogin, login, setLogin, setAdminLogin, setAdminSettingModal, adminSettingModal }) => {
    const [menuOpen, setMenuOpen] = useState(true)
    const history = useNavigate()
    const cartProducts = useCartProductsListener();
    const [filterModalValue, setFilterModalValue] = useState(false)

    const openFilterContainer = () => {
        if (filterModalValue == false) {
            setFilterModalValue(true)
        } else if (filterModalValue == true) {
            setFilterModalValue(false)
        }
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (searchTerm.length > -1) {
            setFilterModalValue(false)
        }
    };

    const trademarkChange = (event) => {
        setSelectedTrademark(event.target.value); // Seçilen markayı güncelle
    };
    const colorChange = (event) => {
        setSelectedColor(event.target.value); // Seçilen rengi güncelle
    };


    const menuOpenButton = () => {
        if (menuOpen == false) {
            setMenuOpen(true)
            setSearchTerm("")
        } else if (menuOpen == true) {
            setMenuOpen(false)
        }
    }
    const visibleAdminSettings = () => {
        if (adminSettingModal == false) {
            setAdminSettingModal(true)
            setSearchTerm("")
        } else if (adminSettingModal == true) {
            setAdminSettingModal(false)
        }
    }
    const handleClick = () => {
        signOut(database).then(val => {
            history('/login')
            toast.success("Çıkış Yapıldı", {
                className: "toast-message"
            })
            setLogin(false)
            setAdminLogin(false)
            setSearchTerm("")
        })
    }
    const clearSearchInput = () => {
        setSearchTerm("")
    }
    const navigateAddProduct = () => {
        setSearchTerm("")
        history('/add-product')
    }
    const clearFilters = () => {
        setSelectedColor("");
        setSelectedTrademark("");
    }
    return (
        <header className='header'>
            <div className="header-left">
                <div className="header-logo"><Link to="/"><img src="/logo.png" className="header-logo-img" /></Link></div>
                <button onClick={menuOpenButton} className="mobile-menu-open-button"><i className="fa-solid fa-bars-staggered mobile-menu-open-button-icon"></i>Menu</button>
            </div>
            <div className={`${menuOpen ? "header-mobile-menu-open" : "header-mobile-menu"}`}>
                <li className="menu-option">Spor Ayakkabı & Sneaker</li>
                <li className="menu-option">Sandalet </li>
                <li className="menu-option">Terlik</li>
                <li className="menu-option">Koşu Ayakkabısı</li>
                <li className="menu-option">Bilekli Aykkabılar</li>
            </div>
            <div className="header-mid">
                <div className="header-mid-options">
                    {/*  <img src="data:image/png;base64,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"
                        className="filter-img"
                        onClick={openFilterContainer}
                    />*/}
                    <input type="text" className="product-search-input" value={searchTerm} onChange={handleSearch} placeholder="Aramak istediğiniz ürünün adını giriniz..." />
                </div>
                {/*
                <div className={`${filterModalValue ? "open-filter-options-container" : "filter-options-container"}`}>
                    <h2 className="filter-options-container-title">
                        Filtreler
                    </h2>
                    <div className="filter-option-container">
                        <li className="filter-option-label">Marka:</li>
                        <select id="trademark" className='filter-inputs' value={selectedTrademark} onChange={trademarkChange}>
                            <option value="">Seçiniz</option>
                            {uniqueTrademarks.map((trademark, index) => (
                                <option key={index} value={trademark}>{trademark}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-option-container">
                        <li className="filter-option-label color-filter-input-label">Renk:</li>
                        <select id="trademark" className='filter-inputs' value={selectedColor} onChange={colorChange}>
                            <option value="">Seçiniz</option>
                            {uniqueColors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={clearFilters} className="clearFilters">Filtreleri Temizle</button>
                </div>
                            */}
            </div>
            <div className={`${adminLogin ? 'admin-header-navigation' : 'header-navigation'}`}>
                <li className={`${adminLogin ? "navigation-option add-product-icon" : "hidden"}`} onClick={navigateAddProduct}><i className="fa-regular fa-square-plus add-product-icon"></i></li>
                {adminLogin && <li className='navigation-option' onClick={visibleAdminSettings} ><i className="fa-solid fa-gear admin-settings"></i></li>}
                {adminLogin == false && <li onClick={clearSearchInput} className='navigation-option'><i className="fa-regular fa-heart option-icon"></i></li>}
                <li className='navigation-option'><Link onClick={clearSearchInput} to="/shopping-basket" className="navigation-option"><i className="fa-solid fa-bag-shopping"></i>{login == true && <div onClick={clearSearchInput} className="basket-in-product-number">{cartProducts.length}</div>}</Link></li>
                <li className={`${login ? "hidden" : "navigation-option"}`}><Link onClick={clearSearchInput} to="/login" className={`${login ? "hidden-login-link" : "login-link"}`}><i className="fa-regular fa-user login-icon"></i></Link></li>
                {login == true && <li className="navigation-option logout-option" onClick={handleClick}><i className="fa-solid fa-right-from-bracket logout-icon"></i>Çıkış Yap</li>}
                <li className={`${adminLogin ? "navigation-option admin-account" : "hidden"}`}><div className="admin-account-icon-bg"><i className="fa-solid fa-user-tie admin-account-icon"></i></div></li>
            </div>
        </header>
    )
}

export default Header