import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Css/RegisterLogin.css"

const LoginAndRegister = ({ setLogin, setAdminLogin, }) => {
    const [panelValue, setPanelValue] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true);
    const [adminEmail, setAdminEmail] = useState(null);
    const [adminName, setAdminName] = useState(null);
    const [adminPassword, setAdminPassword] = useState(null);

    const slideToRightPanel = () => {
        setPanelValue(true)
    }
    const slideToLeftPanel = () => {
        setPanelValue(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const history = useNavigate();


    useEffect(() => {
        const fetchDocumentFields = async () => {
            try {
                const db = getFirestore();
                const documentRef = doc(db, "adminInfos", "adminInfo");
                const documentSnap = await getDoc(documentRef);
                if (documentSnap.exists()) {
                    const documentData = documentSnap.data();
                    setAdminPassword(documentData.password);
                    setAdminName(documentData.name);
                    setAdminEmail(documentData.email);
                }
            } catch (error) {
                console.error("Belge alınamadı:", error);
            }
        };

        fetchDocumentFields();
    }, []);


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
                if (email === adminEmail && password === adminPassword) {
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
                        <input className="form-input" type={showPassword ? 'password' : 'text'} placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button type="button" className="u-password-visibilty-button" onClick={togglePasswordVisibility}>
                            {showPassword ? (<div><img src="https://icons.veryicon.com/png/o/miscellaneous/zoeyhao/password-visible-5.png"
                                className="visibilty-img" /></div>) : (<div><img src="https://icons.veryicon.com/png/o/miscellaneous/zoeyhao/password-not-visible-4.png" className="visibilty-img" /></div>)}
                        </button>
                        <button className="form-button">Hesap Oluştur</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={signinSubmit} className="form">
                        <h1 className="form-title">Oturum Açın</h1>
                        <input className="form-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input className="form-input" type={showPassword ? 'password' : 'text'} placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button type="button" className="password-visibilty-button" onClick={togglePasswordVisibility}>
                            {showPassword ? (<div><img src="https://icons.veryicon.com/png/o/miscellaneous/zoeyhao/password-visible-5.png"
                                className="visibilty-img" /></div>) : (<div><img src="https://icons.veryicon.com/png/o/miscellaneous/zoeyhao/password-not-visible-4.png" className="visibilty-img" /></div>)}
                        </button>
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