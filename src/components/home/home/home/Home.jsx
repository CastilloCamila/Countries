
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getAllCountries,updatePage } from '../../../../redux/actions/index.js'
import style from './Home.module.css'
import Pagination from "../pagination/Pagination.jsx";
import AllCards from '../../countries/allCards/AllCards'
import Search from '../../filters/search/Search.jsx'

export default function Home() {
    //----- Estados y variables------
    const dispatch = useDispatch()
    const filteredCountries = useSelector((state) => state.filteredCountries)

    useEffect(() => {
       
        if (Object.keys(filteredCountries[0]).length === 0) {
            dispatch(getAllCountries())
        }
    }, [dispatch, filteredCountries])


    const countriesPerPage=10

    const page = useSelector(state => state.currentPage)
   

    let filter = []

    const indexFisrstCountry = page * countriesPerPage
    const indexLastCountry = indexFisrstCountry - countriesPerPage
    //-----------------------------


    //------paginate-------

    if (page === 1) {
        filter = filteredCountries.slice(indexLastCountry, 9)
    } else { filter = filteredCountries.slice(indexLastCountry - 1, indexFisrstCountry - 1) }

    const limitPage = (Math.ceil((filteredCountries.length - 9) / countriesPerPage) + 1)

    var firstPrevControl = false                            
    var nextLastControl = false

    if (page === 1) firstPrevControl = true                 
    if (page === limitPage) nextLastControl = true

    const paginate = (e, pageNumber) => {
        console.log('entro paginate', pageNumber)

        if (pageNumber === "next" && page + 1 <= limitPage) {
            console.log('entro next')
            dispatch(updatePage(page + 1))
        } else if (pageNumber === "prev" && page - 1 >= 1) {
            dispatch(updatePage(page - 1))
        } else {
            console.log('no entro')
            dispatch(updatePage(pageNumber))
        }
    }

    //----------------------------
    return (
        <>
            <div className={style.search}>
                <Search className={style.searchBar} />
            </div>
            {/* <Filters /> */}
            <AllCards filter={filter} />
            <Pagination page={page} paginate={paginate} limitPage={limitPage} firstPrevControl={firstPrevControl} nextLastControl={nextLastControl}  />
        </>
    )
}