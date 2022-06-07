import React from "react";

import CardCountry from '../cardCountry/CardCountry'

import style from './AllCards.module.css'
import imgLoading from '../../../../img/loadingMundi.gif'

export default function AllCards({ filter }) {
    return (
        <> {
            filter[0].id ?

                <div className={style.conteiner}>
                    {
                        filter?.map((country) => (
                            <CardCountry name={country.name} image={country.image} continent={country.continent} id={country.id} key={country.id} />
                        ))}
                </div>
                : (
                    <>
                        <div className={style.loading}>
                            <img src={imgLoading} alt="" />
                            <h1>Cargando</h1>
                        </div>
                    </>
                )
            }
        </>
    )
}
