
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import { getAllCountries, filtered, getAllActivities, updatePage } from "../../../../redux/actions"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FiMenu } from "react-icons/fi";
import style from "./Filters.module.css"
import Swal from 'sweetalert2'

export default function Filters() {
    //------- estados y variables----
    const dispatch = useDispatch()

    const [sideBar, setSideBar] = useState(true);
    const showSideBar = () => setSideBar(!sideBar);

    const filteredCountries = useSelector((state) => state.filteredCountries)
    const allActivities = useSelector(state => state.allActivities)

    const [activity, setActivity] = useState("")

    const [population, setPopulation] = useState("")

    const [continent, setContinent] = useState("")

    const [alphabetical, setAlphabetical] = useState("")
    
    //------------------------------



    useEffect(() => {

        if (continent !== '') {
            const filterContinent = filteredCountries.filter(country => country.continent === continent)

         if(filterContinent.length===0){
            console.log('entro a swal')
                     Swal.fire({
                        icon: 'error',
                        title: 'Please reset the filters to filter by another continent',
                        showConfirmButton: true,
                      })
                    
                
         }else{
            dispatch(filtered({}))

            return dispatch(filtered(filterContinent))
         }
            
        }
       
        if (population !== '') {

            if (population === 'asc') {

                const filterPopulation = filteredCountries.sort((a, b) => a.population - b.population)
                dispatch(filtered({}))
                dispatch(filtered(filterPopulation))

            } else if (population === 'desc') {

                const filterPopulation = filteredCountries.sort((a, b) => b.population - a.population)
                dispatch(filtered({}))
                dispatch(filtered(filterPopulation))
            }
        }

       



        if (alphabetical !== '') {

            if (alphabetical === 'asc') {

                const filterAlphabetical = filteredCountries.sort((a, b) => {
                    if (a.name < b.name) return 1
                    if (a.name > b.name) return -1
                    return 0
                })

                dispatch(filtered({}))
                dispatch(filtered(filterAlphabetical))

            } else if (alphabetical === 'desc') {
                const filterAlphabetical = filteredCountries.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })

                dispatch(filtered({}))
                dispatch(filtered(filterAlphabetical))
            }
        }
        if (activity !== '') {
            
            const filterActivies = allActivities.find(act => act.id === activity)
            dispatch(filtered(filterActivies.countries))

        }



    }, [continent, dispatch, population,alphabetical, activity])

    function reset() {

        setPopulation("")
        setActivity("")
        setAlphabetical("")
        setContinent("")
        dispatch(updatePage(1))
        dispatch(getAllCountries())
    }
    return (
        <>
    

                <FiMenu
                    onClick={showSideBar}
                    style={{ cursor: "pointer" }}
                    size={40}
                    className="menu"
                    color="#08337B"
                />
                
                <ProSidebar
                color="#08337B"
                    className={style.sideBarr}
                    
                    collapsed={sideBar}
                    width={310}
                    collapsedWidth={"0px"}

                >
                    <Menu >
                        <MenuItem>
                            <div className={`${style.divsConteiners} ${style.label} ${style.select}`}>
                                <label htmlFor="continent">Continent:</label>
                                <select name="continent" value={continent}  onChange={e => setContinent(e.target.value)} id="">
                                    <option value="">Select a Continent</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Asia">Asia</option>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Oceania">Oceania</option>
                                </select>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className={style.divsConteiners}>
                                <label htmlFor="population">Population:</label>
                                <select name="population" value={population} onChange={e => setPopulation(e.target.value)} id="">
                                    <option value="">Order...</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className={style.divsConteiners}>
                                <label htmlFor="alphabetical">Alphabetical:</label>
                                <select name="alphabetical" value={alphabetical} onChange={e => setAlphabetical(e.target.value)} id="">
                                    <option value="">Order...</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className={style.divsConteiners}>
                                <label htmlFor="activity">Activity:</label>
                                <select name="activity" id='laAC' value={activity} onChange={(e) => setActivity(e.target.value)}>
                                    <option value="">Select an Activity</option>
                                    {
                                        allActivities.map((act) => {

                                            return <option value={act.id}>{act.name}</option>
                                        })

                                    }
                                </select>
                            </div>
                        </MenuItem>
                        <MenuItem>  <button className={style.button} onClick={() => reset()}>RESET FILTERS</button></MenuItem>
                    </Menu>
                </ProSidebar>
            
            {/* <div className={style.conteinerFilters}>
            <div className={`${style.divsConteiners} ${style.label} ${style.select}`}>
                <label htmlFor="continent">Filter By Continent:</label>
                <select name="continent" onChange={e => setContinent(e.target.value)} id="">
                    <option value="">Select a Continent</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>

                </select>
            </div>
            <div className={style.divsConteiners}>
                <label htmlFor="population">Filter By Population:</label>
                <select name="population" onChange={e => setPopulation(e.target.value)} id="">
                    <option value="">Order...</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className={style.divsConteiners}>
                <label htmlFor="alphabetical">Filter By Alphabetical:</label>
                <select name="alphabetical" onChange={e => setAlphabetical(e.target.value)} id="">
                    <option value="">Order...</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className={style.divsConteiners}>
                <label htmlFor="activity">Filter By Activity:</label>
                <select name="activity" id='laAC' value={activity} onChange={(e) => setActivity(e.target.value)}>
                    <option value="">Select an Activity</option>
                    {
                        allActivities.map((act) => {

                            return <option value={act.id}>{act.name}</option>
                        })

                    }
                </select>
            </div>
            <button className={style.button} onClick={() => reset()}>RESET FILTERS</button>
        </div> */}
        </>

    )
}