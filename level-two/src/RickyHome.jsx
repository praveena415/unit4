import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

export default function Ricky() {
  let count = useRef(1);
  let [data, setData] = useState([]);

  useEffect(() => {});

  function prevPage() {
    count.current -= 1;
  }
  function nextPage() {
    count.current += 1;
    console.log(count.current);
  }

  async function fetchData() {
    let res = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${count}`
    );
    console.log(res.data.results);
    setData(res.data.results);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {});

  return (
    <>
      <h1> Ricky and Home {count.current}</h1>
      {console.log(count)}
      {data && (
        <div
          style={{
            border: "2px solid",
            padding: "20px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(5,1fr)",
          }}
        >
          {data.map((item) => (
            <div key={item.id} style={{ border: "2px solid" }}>
              <h3>{item.name}</h3>
              <img src={item.image} />
              <p>Gender:{item.gender}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={prevPage} disabled={count.current <= 1}>
        Prev
      </button>
      <button onClick={nextPage}>Next</button>
    </>
  );
}
