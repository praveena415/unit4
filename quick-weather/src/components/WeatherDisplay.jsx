import React from "react";

export function Weather({data,loading,error}){
    if(loading) return <h6>Loading...</h6>
    if(error) return <div>Error : {error}</div>
    

    return (
        <>
            <h3>{data.name}</h3>
             <p>{temp} C</p>
           
        </>

    )
}