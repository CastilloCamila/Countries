import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCountry.module.css'


function CardCountry({ image, name, continent, id }) {

    return (
        <>
            <div className={styles.profileCard}>
                <div className={styles.header} >
                    <img className={styles.img} src={`${image}`} alt="" />
                    <h1>{name}</h1>
                    <h2> Continent: {continent}</h2>
                    <Link to={`/home/country/${id}`}>
                        <button>More details</button>
                    </Link>
                </div>
            </div>
        </>
    )


}
export default CardCountry
