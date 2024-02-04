import React, { useState } from "react";
import { database } from "../config/Config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Css/RegisterLogin.css"

const LoginAndRegister = ({ setLogin, setAdminLogin , adminEmail ,adminPassword , adminName}) => {
    const [panelValue, setPanelValue] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const slideToRightPanel = () => {
        setPanelValue(true)
    }
    const slideToLeftPanel = () => {
        setPanelValue(false)
    }

    const history = useNavigate();

    const signupSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(database, email, password)
            .then((data) => {
                history("/");
                setEmail("")
                setPassword("")
                setLogin(true);
            })
            .catch((err) => {
                toast.error(err.code, {
                    className: "toast-message"
                });
            });
    }
    const signinSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(database, email, password)
            .then((data) => {
                console.log(data, "authData");
                history("/"); 
                toast.success("Giriş Yapıldı", {
                    className: "toast-message"
                })
                if (email === `${adminEmail}` && password === `${adminPassword}`) {
                    setAdminLogin(true) 
                    setEmail("");
                    setPassword("");
                    toast.success(`Hoşgeldin ${adminName}`, {
                        className: "toast-message"
                    })
                } else {
                    setAdminLogin(false)
                }
                setEmail("");
                setPassword("");
                setLogin(true);
            })
            .catch((err) => {
                toast.error(err.code, {
                    className: "toast-message"
                });
            });
    }

    const handleReset = () => {
        history("/passwordreset");
    }
    return (
        <div className="RegisterLoginPage">
            <div className={`${panelValue ? "container" : "container right-panel-active"}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={signupSubmit} className="form">
                        <h1 className="form-title">Hesap Oluşturun</h1>
                        <input className="form-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="form-input" type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="form-button">Hesap Oluştur</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={signinSubmit} className="form">
                        <h1 className="form-title">Oturum Açın</h1>
                        <input className="form-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="form-input" type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <a className="reset-password" onClick={handleReset}>Şifreni mi unuttun?</a>
                        <button className="form-button">Giriş Yap</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="overlay-title">Tekrar hoşgeldiniz :)</h1>
                            <p className="overlay-text">Bizimle bağlantıda kalmak için lütfen kişisel bilgilerinizle giriş yapın</p>
                            <button className="ghost form-button" id="signIn" onClick={slideToRightPanel}>Giriş Yap</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="overlay-title">Heyy Merhaba !!</h1>
                            <p className="overlay-text">Kişisel bilgilerinizi girin ve bizimle <br /> yolculuğa başlayın</p>
                            <button className="ghost form-button" onClick={slideToLeftPanel} id="signUp">Kayıt Ol</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginAndRegister