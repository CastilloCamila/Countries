import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import { AddActivity, getAllActivities } from "../../../../../redux/actions";
import Swal from 'sweetalert2'
import style from './AddActivity.module.css'

//-------Mapeo de countries para agregarles las actividades-----
function findCountries(countries) {
    let countriesname = countries.map(country => {
        return { id: country.id, name: country.name }
    })
    return countriesname
}
//-------Mapeo de countries para agregarles las actividades-----
const dificultiesValues = [1, 2, 3, 4, 5]

export default function Addactivity() {
    //---------- Estados--------
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.allActivities)
    const countries = useSelector((state) => state.countries);
    const history= useHistory()

    const [activityAdded, setActivityAdded] = useState('')
    const [errors, setErrors] = useState({})
    const [addedCountries, setAddedCountries] = useState([])
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "DEFAULT",
        duration: "DEFAULT",
        season: "DEFAULT",
        country: ''
    })
    //---------- Estados--------
  
    
    const foundCountries = findCountries(countries)
    
 
    useEffect(() => {

        return () => {
            setAddedCountries([])
            setActivity({
                name: "",
                difficulty: "DEFAULT",
                duration: "DEFAULT",
                season: "DEFAULT",
                country: ''
            })
            setActivityAdded('')
            dispatch(getAllActivities())
        }
    }, [dispatch])
    // ---- funcion para manejo de errores-----

    function validate(activity) {
        let errors = {}
        if (activity.name === "") errors.name = 'A name is required'
        if(/^\s/.test(activity.name)) errors.name = 'Not allow'
        if (/[`~,.<>;':"/[\]|{}()=_+-?¡!¿*{}´´¨´&%$#°]/.test(activity.name)) errors.name = 'Name not allowed especials characters or numbers'
        if (activity.difficulty === 'DEFAULT') errors.difficulty = 'You must select a difficulty'
        if (activity.duration === 'DEFAULT') errors.duration = 'You must select a duration'
        if (activity.season === 'DEFAULT') errors.season = 'You must select a seasson'
        return errors
    }
    // -------------------------------
    //----- agregar y quitar paises-----

    function addCountry() {
        if (activity.country === "") setErrors({ ...errors, country: 'You must select a country' })
        else {
            if (addedCountries.includes(activity.country)) {
                setErrors({ ...errors, country: 'You are already selected this country' })
                setActivity({
                    ...activity,
                    country: ''
                })
            }
            else {
                setAddedCountries([...addedCountries, activity.country])
                setActivity({
                    ...activity,
                    country: ''
                })
            }
        }
    }

    function quitCountry(id) {
        let filteredCountries = addedCountries.filter(country => country !== id)
        setAddedCountries(filteredCountries)

    }
    //---------------------------------------------
    //----- Manejo de cambios en el fomulario----
    function handleOnChange(e) {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })
        setErrors(validate(
            {
                ...activity,
                [e.target.name]: e.target.value
            }
        ))
        setActivityAdded('')
    }
    //---------------------------------------------
    // ------- Manejo de submi----------------
    function handleOnSubmit(event) {
        event.preventDefault()
        if (Object.keys(errors).length === 0) {
            if (allActivities.find(act => act.name === activity.name)) return setErrors({ ...errors, name: "This activity already exist" })
            else {
                const activitytoSend = {
                    name: activity.name,
                    difficulty: activity.difficulty,
                    duration: activity.duration,
                    season: activity.season,
                    countries: addedCountries
                }
                dispatch(AddActivity(activitytoSend))
                setAddedCountries([])
                setActivity({
                    name: "",
                    difficulty: "DEFAULT",
                    duration: "DEFAULT",
                    season: "DEFAULT",
                    country: ''
                })
                Swal.fire({
                    icon: 'success',
                    title: 'The activity was created successfully',
                    showConfirmButton: false,
                    timer: 2000
                  })
                history.push('/home')

            }
        } else {
            setActivityAdded('The activity can not be created')
        }
    }


    return (
        <>
            <div className={style.background}>
                <div className={style.divform}>
                    <form className={style.form} onSubmit={handleOnSubmit}>
                        {/* Input Name */}
                        <div className={style.formselect}>
                            <label htmlFor="name">Name</label>
                            <input autocomplete="off" placeholder="Name of the activity" type="text" name="name" value={activity.name} onChange={handleOnChange} />

                            {errors.name &&
                                <p className={style.p}>{errors.name}</p>
                            }
                        </div>
                        {/* Select Difficulty*/}
                        <div className={style.formselect}>
                            <label htmlFor="difficulty">Dificulty</label>

                            <select className={style.select} name="difficulty" id="" value={activity.difficulty} onChange={handleOnChange}>
                                <option value="DEFAULT" >Select Duration</option>
                                {
                                    dificultiesValues.map((dificulty) => {
                                        return <option value={dificulty}>{dificulty}</option>
                                    })
                                }
                            </select>
                            {errors.difficulty &&
                                <p className={style.p}>{errors.difficulty}</p>
                            }
                        </div>
                        {/* Select Duration*/}
                        <div className={style.formselect}>
                            <label htmlFor="duration">Duration</label>

                            <select className={style.select} name="duration" id="" value={activity.duration} onChange={handleOnChange}>
                                <option value="DEFAULT">Select Duraction</option>
                                <option value="1 Hour">1 Hour</option>
                                <option value="2 Hours">2 Hours</option>
                                <option value="3 Hours">3 Hours</option>
                                <option value="4 Hours">4 Hours</option>
                                <option value="5 Horas">5 or more hours</option>
                            </select>
                            {errors.duration &&
                                <p className={style.p}>{errors.duration}</p>
                            }
                        </div>
                        {/* Select Season*/}
                        <div className={style.formselect}>
                            <label htmlFor="season">Season</label>
                            <select className={style.select} name="season" id="" value={activity.season} onChange={handleOnChange}>
                                <option value="DEFAULT">Select a Seasson</option>
                                <option value="Summer">Summer</option>
                                <option value="Spring">Spring</option>
                                <option value="Autum">Autumn</option>
                                <option value="Winter">Winter</option>
                            </select>
                            {errors.season &&
                                <p className={style.p}>{errors.season}</p>
                            }
                        </div>

                        {/* Select Country*/}
                        <div className={style.formselect}>
                            <label htmlFor="country">Select Countries</label>
                            <input placeholder="Select Countries" list="countries" name='country' type="search" value={activity.country} onChange={handleOnChange} />

                            <datalist id='countries'>
                                {
                                    foundCountries.map((country) => {

                                        return <option value={country.id}> {country.name}</option>
                                    })

                                }
                            </datalist>
                            <button className={`${style.buttonCountry} ${style.add}`} type="button" onClick={() => !errors.country && addCountry()}>Add country</button>
                            {errors.country &&
                                <p className={style.p}>{errors.country}</p>
                            }
                        </div>
                        <label htmlFor="countriesAdded">Added countries</label>
                        <div className={style.addCountries}>
                            {
                                addedCountries.map((country) => {
                                    return <>
                                        <div className={style.countryAdd}>
                                            <p>{country}</p>
                                            <button className={`${style.buttonCountry} ${style.quit}`} name='countriesAdded' type="button" onClick={() => quitCountry(country)}> Quit country</button>
                                        </div>
                                    </>
                                })
                            }
                        </div>

                        <button className={style.buttonActivity} type="submit" >Add Acivity</button>

                        <div className={style.alert}>
                            {activityAdded &&
                                <p>{activityAdded}</p>
                            }

                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}