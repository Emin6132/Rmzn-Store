import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { database } from "../config/Config";
import { useNavigate } from "react-router-dom";
import "../Css/ForgotPassword.css"

function ForgotPassword() {
    const history = useNavigate();
    const [resetPassword, setResetPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        sendPasswordResetEmail(database, resetPassword).then(data => {
            alert("Mailinize gönderdiğimiz linkten parolanızı sıfırlayabilirsiniz")
            history("/login")
        }).catch(err => {
            alert(err.code)
        })
    }
    return (
        <div className="ForgotPasswordPage">
            <div className="reset-password-form-container">
                <div className="reset-password-form">
                    <h2 className="reset-password-form-title">Emailinizi giriniz</h2>
                    <form className="reset-password-input-button" onSubmit={(e) => handleSubmit(e)}>
                        <input name="email" className="reset-password-form-input" onChange={(e) => setResetPassword(e.target.value)} value={resetPassword} />
                        <button className="reset-password-form-button">Reset</button>
                    </form>
                </div>
                <div className="reset-password-container-overlay">
                    <h1 className="reset-password-form-overlay-text">
                        Parola Sıfırlama
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;