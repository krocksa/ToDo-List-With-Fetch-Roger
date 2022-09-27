import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';



//create your first component
const Home = () => {

	const [ generaciones, setGeneraciones ] = useState([]);

	useEffect(() => {

	fetch("https://pokeapi.co/api/v2/generation").then(resp => resp.json()).then(data => setGeneraciones(data.results))
},[]);
	return (
		<div className="text-center">
			{generaciones.map(generacion =>{
				return <p>{generacion.name}</p>
			})}
		</div>
	)
};

export default Home;
