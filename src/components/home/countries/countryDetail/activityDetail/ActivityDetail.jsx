import style from "./ActivityDetail.module.css";


export default function AcivityDetail({ name, difficulty, duration, season, number }) {
    return (
        <div className={style.detail} >

            <h2>{number}) Activity Name:  {name}</h2>
            <p className={style.p}>Difficulty: Level {difficulty}</p>
            <p className={style.p}>Duration: {duration}</p>
            <p className={style.p}>Season: {season}</p>

        </div>
    )
}