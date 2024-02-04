import { useState } from 'react'
import '../Css/Hero.css'
import { Link } from "react-router-dom"

const Hero = () => {
    const [discounted, setDiscounnted] = useState(false)

    return (
        <div className='hero'>
            <div className="hero-items">
                <div className="hero-item-1">
                    <p className="hero-item-1-text">
                        Günlük Giyim
                    </p>
                </div>
                <div className="hero-item-2">
                    <p className="hero-item-2-text">
                        Rahatlık
                    </p>
                </div>
                <div className="hero-item-3">
                    <p className="hero-item-3-text">
                        Kışlık Giyim
                    </p>
                </div>
            </div>
            <div className={`${discounted ? "discounted-products-banner" : "hidden-discounted-products-banner"}`}>
                <p className="discounted-products-banner-title">
                    İndirimli Ürünleri Sakın Kaçırmaa!!!
                </p>
                <div className='banner-button-container'>
                    <button className='dont-show-banner-button discounted-banner-button'>Bunu Görmek İstemiyorum</button>
                    <button className='discounted-product-show-button discounted-banner-button'>İndirimli Ürünler Göster</button>
                </div>
            </div>
        </div>
    )
}

export default Hero