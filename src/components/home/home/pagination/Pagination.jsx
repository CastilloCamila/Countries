
import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Pagination.module.css'
import { updatePage } from '../../../../redux/actions';

export default function Pagination({ totalCountries, countriesPerPage, indexLastCountry }) {
    //---Estados y variables-----
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const pageNumbers = []

    //----------------------------
    //----- cantidad de paginas-------
    for (let i = 2; i <= Math.ceil((totalCountries - 9) / countriesPerPage) + 1; i++) {
        pageNumbers.push(i)
    }
    //----------------------------
    //------paginate-------
    useEffect(() => {
        for (let i = 1; i <= Math.ceil(((totalCountries - 9) / countriesPerPage) + 1); i++) {
            let page = document.getElementById(i);

            page.classList.remove(style['currentPage']);
        }
        let current = document.getElementById(currentPage);
        current.classList.add(style['currentPage'])
    }, [currentPage,totalCountries,countriesPerPage])


    function paginate(number) {
        dispatch(updatePage(number))
    }

    function nextPage() {
        if (currentPage < Math.ceil(((totalCountries - 9) / countriesPerPage) + 1)) {

            console.log('ress', Math.ceil(((totalCountries - 9) / countriesPerPage) + 1))
            for (let i = 1; i <= Math.ceil(((totalCountries - 9) / countriesPerPage) + 1); i++) {
                let page = document.getElementById(i);
                page.classList.remove(style['currentPage']);
            }
            let current = document.getElementById(currentPage + 1);
            current.classList.add(style['currentPage'])
            dispatch(updatePage(currentPage + 1))
        }
    }

    function previusPage() {
        if (indexLastCountry > 0) {
            for (let i = 1; i <= Math.ceil(((totalCountries - 9) / countriesPerPage) + 1); i++) {
                let page = document.getElementById(i);
                page.classList.remove(style['currentPage']);
            }
            let current = document.getElementById(currentPage - 1);
            current.classList.add(style['currentPage'])
            dispatch(updatePage(currentPage - 1))
        }
    }

    //---------------------------------
    return (
        <div className={style.containerButtons}>
            <button onClick={() => previusPage()}>
                Prev
            </button>
            <button onClick={() => paginate(1)} id='1' className={style.currentPage}> 1</button>
            {
                pageNumbers.map(number => {
                    return <button key={number} id={number} onClick={() => paginate(number)}> {number}</button>
                })
            }
            <button onClick={() => nextPage()}>
                Next
            </button>
        </div>

    )
};
