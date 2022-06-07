
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.background}>
        <div className={style.div}>
            <h1>Travel across the world</h1>
            <button className={style.btn}>
                <Link className={style.link} to={'/home'}>
                    <p>Start the Travel</p>
                </Link>
            </button>

        </div>
        </div>
    )
}