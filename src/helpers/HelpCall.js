import axios from "axios";

export default async  function helpCall(url) {
   return  axios.get(`https://individual-proyect-countries.herokuapp.com${url}`)
   .then(res=>res.data)
   .then(res=>{return res})
   
}