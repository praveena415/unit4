import React,{useState} from "react";
import { SearchBox } from "./components/SearchBar";
import { Weather } from "./components/WeatherDisplay";
import simpleFetch from "./useFetch";

const API_KEY ="c5e937221129b9740ab84f6d98dbc7b6"

 function App(){
  const [city,setCity] = useState("")
  const url = city ? "https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=YOUR_API_KEY&units=metric":null;
  const {data,loading,error} = simpleFetch(url)

  return (
    <>
      <SearchBox onSearch = {setCity}/>
      <Weather data ={data} loading={loading} error ={error}/>
    </>
  )
}
export default App