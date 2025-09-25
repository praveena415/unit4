import { useState, useEffect } from "react";

export default function simpleFetch(url){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(()=>{
        if(!url) return

        setData(null);
        setError(null);
        setLoading(true)

        
    })
    return ({data,loading,error})
}