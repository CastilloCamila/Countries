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
                    <h1>{countryDetail.name}</h1>
                    <img src={`${countryDetail.image}`} alt="" />
                    <p>Continent: {countryDetail.continent}</p>
                    <p>Capital: {countryDetail.capital}</p>
                    <p>Subregion: {countryDetail.subregion}</p>
                    <p>Area: {countryDetail.area}</p>
                    <p>Papulation: {countryDetail.population}</p>


                </div>
                <div className={style.activityDetail}>
                    <p>  Activities Of This Country</p>
                    <div className={style.scroll}>
                        { countryDetail.activities.length >0?
                        

                            countryDetail.activities.map((actDetail, number = 0) => {
                                number++
                                return <AcivityDetail name={actDetail.name} difficulty={actDetail.difficulty} duration={actDetail.duration} season={actDetail.season} number={number} id={actDetail.id} key={actDetail.id} />
                            })
                                : 
                                <>
                                <img src={imgLoading2} alt="" />
                                <p>
                                There are no activities for this country.</p>
                               <p> If you want you can add one in "Add Activity"</p>
                                </>

                        } 


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