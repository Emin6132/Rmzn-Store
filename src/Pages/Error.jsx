import React from 'react'
import { Link } from 'react-router-dom'
import "../Css/Error.css"

const Error = () => {
    return (
        <div className='ErrorPage'>
            <div className='error-page-text'>
                <h1 className='error-text-title'>Bir Hata Oluştu!!</h1>
                <Link to="/" className='turn-back-button'><b>Geri Dön</b></Link>
            </div>
        </div>
    )
}

export default Error