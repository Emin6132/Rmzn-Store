import { useState } from "react"
import { signOut } from "firebase/auth";
import "../Css/Header.css"
import { Link } from "react-router-dom"
import { database } from '../config/firebase';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useCartProductsListener } from "../config/firebase"


const Header = ({  adminLogin, login, setLogin, setAdminLogin, setAdminSettingModal, adminSettingModal }) => {
    const [menuOpen, setMenuOpen] = useState(true)
    const history = useNavigate()
    const cartProducts = useCartProductsListener();

    const menuOpenButton = () => {
        if (menuOpen == false) {
            setMenuOpen(true)
        } else if (menuOpen == true) {
            setMenuOpen(false)
        }
    }
    const visibleAdminSettings = () => {
        if (adminSettingModal == false) {
            setAdminSettingModal(true)
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
        })
    }
    
    const navigateAddProduct = () => {
        history('/add-product')
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
                    <li className="header-mid-option">Spor Ayakkabı & Sneaker</li>
                    <li className="header-mid-option">Bilekli Aykkabılar</li>
                    <li className="header-mid-option">Koşu Ayakkabısı</li>
                    <li className="header-mid-option">Sandalet </li>
                    <li className="header-mid-option">Terlik</li>
                </div>
            </div>
            <div className={`${adminLogin ? 'admin-header-navigation' : 'header-navigation'}`}>
                <li className={`${adminLogin ? "navigation-option add-product-icon" : "hidden"}`} onClick={navigateAddProduct}><i className="fa-regular fa-square-plus add-product-icon"></i></li>
                {adminLogin && <li className='navigation-option' onClick={visibleAdminSettings} ><i className="fa-solid fa-gear admin-settings"></i></li>}
                {adminLogin == false && <li className='navigation-option'><i className="fa-regular fa-heart option-icon"></i></li>}
                <li className='navigation-option'><Link to="/shopping-basket" className="navigation-option"><i className="fa-solid fa-bag-shopping"></i><div className="basket-in-product-number">{cartProducts.length}</div></Link></li>
                <li className={`${login ? "hidden" : "navigation-option"}`}><Link to="/login" className={`${login ? "hidden-login-link" : "login-link"}`}><i className="fa-regular fa-user login-icon"></i></Link></li>
                {login == true && <li className="navigation-option logout-option" onClick={handleClick}><i className="fa-solid fa-right-from-bracket logout-icon"></i>Çıkış Yap</li>}
                <li className={`${adminLogin ? "navigation-option admin-account" : "hidden"}`}><div className="admin-account-icon-bg"><i className="fa-solid fa-user-tie admin-account-icon"></i></div></li>
            </div>
        </header>
    )
}

export default Header