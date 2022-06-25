import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCountryDetail, cleartDetail } from '../../../../../redux/actions/index.js'
import { useParams } from 'react-router-dom'

import AcivityDetail from '../activityDetail/ActivityDetail'

import style from './CountryDetail.module.css'
import imgLoading from '../../../../../img/loadingMundi.gif'
import imgLoading2 from '../../../../../img/loadingMundi-1--unscreen.gif'

export default function CountryDetail() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const countryDetail = useSelector((state) => state.countryDetail)

    useEffect(() => {
        dispatch(getCountryDetail(id))

        return () => {
            dispatch(cleartDetail())
        }


    }, [dispatch, id])

    return (<>


        {countryDetail.id ?
            <>
                <div className={style.card}>

                    <div className={style.cardDetail}>
                        <div className={style.countryData}>
                            <div>
                                <img className={style.flag} src={`${countryDetail.image}`} alt="" />
                            </div>
                            <div className={style.data}>
                                <h1>{countryDetail.name}</h1>
                                <p className={style.contenido}>Continent: {countryDetail.continent}</p>
                                <p className={style.contenido}>Capital: {countryDetail.capital}</p>
                                <p className={style.contenido}>Subregion: {countryDetail.subregion}</p>
                                <p className={style.contenido}>Area: {countryDetail.area}</p>
                                <p className={style.contenido}>Population: {countryDetail.population}</p>
                            </div>

                        </div>
                        <div className={style.activityDetail}>
                            <h2>  Activities Of This Country:</h2>
                            <div className={style.scroll}>
                                {countryDetail.activities.length > 0 ?


                                    countryDetail.activities.map((actDetail, number = 0) => {
                                        number++
                                        return <AcivityDetail name={actDetail.name} difficulty={actDetail.difficulty} duration={actDetail.duration} season={actDetail.season} number={number} id={actDetail.id} key={actDetail.id} />
                                    })
                                    :
                                    <>
                                        <img className={style.imagenLoad} src={imgLoading2} alt="" />
                                        <p>
                                            There are no activities for this country.</p>
                                        <p> If you want you can add one in "Add Activity"</p>
                                    </>

                                }


                            </div>
                        </div>



                    </div>

                </div>
            </>
            :
            <>
                <div className={style.loading}>
                    <img src={imgLoading} alt="" />
                    <h1>Cargando</h1>
                </div>
            </>


        }
    </>
    )
}