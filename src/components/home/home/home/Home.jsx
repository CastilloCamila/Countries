
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getAllCountries } from '../../../../redux/actions/index.js'
import style from './Home.module.css'


import Filters from "../../filters/filters/Filters.jsx";

import Pagination from "../pagination/Pagination.jsx";
import AllCards from '../../countries/allCards/AllCards'
import Search from '../../filters/search/Search.jsx'

export default function Home() {
    //----- Estados y variables------
    const currentPage = useSelector(state => state.currentPage)
    const filteredCountries = useSelector((state) => state.filteredCountries)

    const [countriesPerPage] = useState(10)


    const dispatch = useDispatch()

    let filter = []

    const indexFisrstCountry = currentPage * countriesPerPage
    const indexLastCountry = indexFisrstCountry - countriesPerPage
    //-----------------------------

    useEffect(() => {
        if (Object.keys(filteredCountries[0]).length===0) {
            dispatch(getAllCountries())
        }
    }, [dispatch,filteredCountries])

    //------paginate-------

    if (currentPage === 1) {
        filter = filteredCountries.slice(indexLastCountry, 9)
    } else { filter = filteredCountries.slice(indexLastCountry - 1, indexFisrstCountry - 1) }


    //----------------------------
    return (
        <div className={style.conteiner}>
            <div className={style.search}>
                <Search className={style.searchBar} />
            </div>
            <Filters />
            <AllCards filter={filter} />
            <Pagination totalCountries={filteredCountries.length} countriesPerPage={countriesPerPage} indexLastCountry={indexLastCountry} />
        </div>
    )
}