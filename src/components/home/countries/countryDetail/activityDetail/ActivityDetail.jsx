import style from "./ActivityDetail.module.css";
import {BiTimer} from 'react-icons/bi'
import {BiRun}from 'react-icons/bi'
import {FaTemperatureHigh} from 'react-icons/fa'


export default function AcivityDetail({ name, difficulty, duration, season, number }) {
    
    return (
        <div className={style.allData}>
            <h2>{number}) Activity Name:  {name}</h2>
            <div className={style.detail} >
                <p className={style.p}>Difficulty: Level {difficulty} <BiRun size={25}/> |</p>
                <p className={style.p}>Duration: {duration} <BiTimer size={25}/> |</p>
                <p className={style.p}>Season: {season} <FaTemperatureHigh size={23} />
              
                </p>
                
            </div>
        </div>
    )
}