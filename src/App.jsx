import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [onChange, setOnchange] = useState("");
  const [obtenerInfo, setObtenerInfo] = useState("");
  const [lista, setLista] = useState([]);
  const ref = useRef("");

  const apiKey = "87d10832";
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=${obtenerInfo}`;

  const getInfo = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setLista(data.Search);
    } catch (error) {
      console.log("Se ha producido un error al realizar el fetch.")
    }
  };

  useEffect(() => {
    getInfo();
  }, [obtenerInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setObtenerInfo(onChange);
    ref.current = obtenerInfo;
    setOnchange("");
  };

  return (
    <>
      <h1>Info Pelis</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="obtener info"
          value={onChange}
          onChange={(e) => {
            setOnchange(e.target.value);
          }}
        />
        <button>buscar</button>
      </form>

      <div className="container-pelis">
        {lista
          ? ref.current != obtenerInfo
            ? lista.map((item) => {
                return (
                  <div key={item.imdbID} className="card-peli">
                    <h2>Titulo: {item.Title}</h2>
                    <p>Año: {item.Year}</p>
                    <img src={item.Poster} alt={item.Title} />
                  </div>
                );
              })
            : "Busqueda realizada anteriormente, busca otra cosa!"
          : "No se ha realizado ninguna busqueda aun"}
      </div>
    </>
  );
}

export default App;
