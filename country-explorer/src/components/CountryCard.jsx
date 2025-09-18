import React from "react";

function CountryCard({name,population,region, capital, flag}){
    return (
        <div>
            <h2>{name}</h2>
            <img src={flag} alt="" />
            <h4>{region} - {capital}</h4>
            <h6>{population}</h6>
        </div>
    )
}
export default CountryCard