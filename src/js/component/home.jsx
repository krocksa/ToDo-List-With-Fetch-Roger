import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';



//create your first component
const Home = () => {

	const [ generaciones, setGeneraciones ] = useState([]);

	useEffect(() => {

	// fetch("https://pokeapi.co/api/v2/generation").then(resp => resp.json()).then(data => setGeneraciones(data.results))

	const postToDo = async () => {
		
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/krocksa",{
			headers:{
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify([])
		});
		let data = await response.json();
		console.log(data);
		
	}
	postToDo()
	
},[]);

useEffect(() => {

	// fetch("https://pokeapi.co/api/v2/generation").then(resp => resp.json()).then(data => setGeneraciones(data.results))

	const putToDo = async () => {
		
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/krocksa",{
			headers:{
				"Content-Type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify( [
				{ label: "Make the bed", done: false },
				{ label: "Walk the dog", done: false },
				{ label: "Do the replits", done: false }
			  ])
		});
		let data = await response.json();
		setInputValue(data);
		
	}
	putToDo()

},[]);

useEffect(() => {

	// fetch("https://pokeapi.co/api/v2/generation").then(resp => resp.json()).then(data => setGeneraciones(data.results))

	const getToDo = async () => {
		
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/krocksa",{
			headers:{
				"Content-Type": "application/json"
			},
			method: "GET"
		});
		let data = await response.json();
		console.log(data);
		
	}
	getToDo()

},[]);


const [ inputValue, setInputValue ] = useState('');
	const [ all, setAll ] = useState([]);

	function handleChange(parameter) {
		const value = parameter.target.value;
		setInputValue(value);
	}

	function handleAdd(parameter) {
		let copyAll = [...all];
		if (parameter.key === 'Enter') {
				
			copyAll.push(inputValue);
			setAll(copyAll);
			setInputValue("")
		}
	}
	function handleDelete(parameter) {
		let copyAll = [...all];
		copyAll.pop(inputValue);
		setAll(copyAll);
	}

	return (
		<div className="todolist">
			<div className="dentroDe">
				<h1>ALL TASKS</h1>
			<div className="input">
				<input type="text" placeholder="Input Task"
				 value={inputValue} onChange={handleChange} 
				 onKeyDown={handleAdd} />
				<button onClick={handleAdd}>Add</button>
			</div>
					<div className="text-center">
						{generaciones.map(generacion =>{
							return <p>{generacion.name}</p>
						})}
					</div>
				{
					all.map((one,index) => {
						return(
							<div className="newOne" key={index}>								
								{one}
								<button className="button" onClick={handleDelete}>X</button>
							</div>
						)
					})
			
				}
			</div>
		</div>
	);
};

export default Home;
