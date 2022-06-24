import React from "react";
import { Link } from "react-router-dom";

import style from "./navBar.module.css"
import logo from "../../../../img/logo.gif"

export default function NavBar() {
    return (
        <>
            <div className={style.navarr} >
                <img src={logo} alt="" width="150" height="60" />
               <div className={style.contenedorBtn}>
                    <button className={style.btn}>
                        <Link className={style.link} to='/home'>Home</Link>
                    </button>
                    <button className={style.btn}>
                        <Link className={style.link} to='/home/activity'>
                            Add an Activity
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}