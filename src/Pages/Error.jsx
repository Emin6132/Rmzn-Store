import React from 'react'
import { Link } from 'react-router-dom'
import "../Css/Error.css"
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()

    const TurnBack = () => {
        navigate(-1)
    }
    
    return (
        <div className='ErrorPage'>
            <div className='error-page-text'>
                <h1 className='error-text-title'>Bir Hata Oluştu!!</h1>
                <div type='button' onClick={TurnBack} className='turn-back-button'>Geri Dön</div>
            </div>
        </div>
    )
}

export default Error