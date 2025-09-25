import React, { useState } from "react";

export function SearchBox({onSubmit}){
    const [q,setQ] = useState("")

    function handleSubmit(e){
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter the name of the city" type="text" value={q} onChange={(e)=>setQ(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}