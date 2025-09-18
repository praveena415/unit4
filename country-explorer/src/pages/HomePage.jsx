import { useEffect, useState } from "react";


export function HomePage(){
    const [countries, setCountries] = useState([])
  

    async function Fetch(){
        let res = await fetch("https://restcountries.com/v3.1/region/europe")
        let data = await res.json()
        setCountries(data)
    }

    useEffect(()=>{
        Fetch()
    })
    if(!countries) return <h4>Loading...</h4>

    return (
        <h2>Europe Countries</h2>
    )
}