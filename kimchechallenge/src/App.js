import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { GrCurrency } from 'react-icons/gr'
import { MdSmartphone } from 'react-icons/md'
import paises from "./query/query";



const App = () => {

  const [getCountries, result] = useLazyQuery(paises)

  const [countries, setCountries] = useState([])
  const [continent, setContinent] = useState(true)
  const [aux, setAux] = useState([])


  const handelChange = (e) => {
    let resultadosBusqueda = countries.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
        return elemento
      }
    })
    setAux(resultadosBusqueda)
    if (e.target.value == "") {
      setAux([])
    }
  }

  const handelOptions = () => setContinent(!continent)

  useEffect(() => {
    getCountries()
    if (result.data) {
      setCountries(result.data.countries)
    }

  }, [result])




  return (

    <>
      <Navbar />
      <div className="container">
        <h1>Country Search</h1>
        <p>Write a random country </p>
        <div className="containerInput">
          <AiOutlineSearch />
          <input
            onChange={handelChange}
          ></input>
        </div>
        <div className="containerActions">
          <h2>Group by</h2>
          <button className="button continents" onClick={handelOptions}>Continents</button>
          <button className="button languaje" onClick={handelOptions}>Language</button>
        </div>
        {
          aux.map((x) => {
            return (
              <>
                {continent ? <h3> {x.continent.name} </h3> : (
                  <>
                    <h3>Languajes</h3>
                    <ul>
                      {
                        x.languages.map(lan =>

                          <li>
                            {lan.name}
                          </li>

                        )

                      }
                    </ul>
                  </>
                )}
                <div className="containerCountries">
              

                  <div className="containerFlag">
                    <img
                      className="flag"
                      src={`https://www.banderas-mundo.es/data/flags/w580/${x.code.toString().toLowerCase()}.webp`}
                    />
                    <p>{x.name}</p>
                  </div>
                  <p>Capital: {x.capital}</p>
                  <div className="containerFlag">
                    <GrCurrency />
                    <p className="space">
                      {x.currency}
                    </p>

                  </div>

                  <div className="containerFlag">
                    <MdSmartphone />
                    <p className="space">
                      +{x.phone}
                    </p>

                  </div>

                </div>
              </>
            )
          })
        }
      </div>

    </>


  );
};
export default App;
