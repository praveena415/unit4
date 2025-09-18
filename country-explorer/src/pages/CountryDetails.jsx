import { useState, useEffect } from "react";


export function CountryDetails(){
    const [country, setCountry] = useState([])
    

    async function Fetchdata(){
        let response = await fetch(`https://restcountries.com/v3.1/name/COUNTRY_NAME`)
        let result = await response.json()
        setCountry(result)
    }

    useEffect(()=>{
        Fetchdata()
    }    
   )
   if(!country) return <h4>Loading...</h4>

   return (
    <div>
        <h2>{country.name.common}</h2>
    </div>
   )
}
