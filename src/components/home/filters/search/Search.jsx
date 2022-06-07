import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { filtered } from '../../../../redux/actions'
import helpCall from '../../../../helpers/HelpCall'

import style from './Search.module.css'

export default function Search() {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState('')
    const [search, setSearch] = useState({ search: '' })

    function handleOnChange(e) {
        setSearch({ ...search, search: e.target.value })
        setErrors('')
    }

    async function handleOnsubmit(event) {
        event.preventDefault()
        try {
            const response = await helpCall(`/countries?name=${search.search}`)

            dispatch(filtered(response))
            setErrors('')
            setSearch({ ...search, searchs: '' })
            
        } catch (error) {

            setErrors(error.response.data.msg)
        }
    }
    return (
        <div className={style.form}>
            <input className={style.input} placeholder='Search a Country' type="text" name="search" value={search.search} onChange={(e) => handleOnChange(e)} />
            <button className={style.button} onClick={handleOnsubmit}>Search</button>
            {errors &&
                <p>{errors}</p>
            }
        </div>
    )
}