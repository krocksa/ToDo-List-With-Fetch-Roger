import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {

	const urlApi = "https://assets.breatheco.de/apis/fake/todos/user"

	const [ input, setInput ] = useState('');
	const [ all, setAll ] = useState([]);
	const [inputUser, setInputUser] = useState("")
	const [user, setUser] = useState("")

	const postToDo = async (newUser) =>{
		let response = await fetch(`${urlApi}/${newUser}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"POST",
			body: JSON.stringify([]) 
		})
		let data = await response.json()
		if (response.ok){
			getTodo(newUser)
		}
	}

	const putTodo = async (newTasks) => {

		let response = await fetch(`${urlApi}/${user}`,{
			headers: {
				"Content-Type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify(newTasks)
		})
		let data = await response.json();
		if (response.ok) {
			console.log(data)
			getTodo(user);
		}
	}

	const getTodo = async (newUser) => {
		let response = await fetch(`${urlApi}/${newUser}`,{
			headers: {
				"Content-Type": "application/json"
			},
			method: "GET",
		})
		let data = await response.json()
		if (response.ok) {
			setAll(data)
		} 
		else {
			postToDo(newUser)
		}
	}
	useEffect(()=>{
		getTodo();
	},[])
	function handleAdd(e) {
		if (e.key == "Enter"){
			setAll([...all,{label:input,done:false}]);
			putTodo([...all,{label:input,done:false}]);
			setInput("");
		}
	}
	
	const handleAddUser = (e)=>{
		if (e.key == "Enter"){
			setInputUser(e.target.value)
			setUser(e.target.value)
			getTodo(e.target.value)
			postToDo(e.target.value)
			setInputUser("");
		}
	}

	const handleDelete = (currentIndex)=>{
		let newTasks = all.filter((task, index)=> index != currentIndex)
		setAll(newTasks)
		putTodo(newTasks);
	}

	const handleDeleteUser = async () => {
		let response = await fetch(`${urlApi}/${user}`,{
			headers: {
				"Content-Type": "application/json"
			},
			method: "DELETE"
		})
		let data = await response.json();
		if (response.status == 200) {
			console.log("Chao");
		}
	}

	return (
		<div className="title">
			<h2>ToDo Fetch Roger.js</h2>
				<div className="todolist">
					<div className="dentroDe">
						<h3>ALL TASKS & USERS</h3>
					<div className="input">
					<input 
						type="text" placeholder="Input Task"
						onChange={(e)=>{setInput(e.target.value)}} 
						value={input} 
						onKeyDown={handleAdd}
					/>
					</div>

					<button  onClick={() => handleDeleteUser()}>
					Delete User
					</button>

					<input 
			 	type="text" 
				onChange={(e)=>{setInputUser(e.target.value)}} 
				value={inputUser} 
				placeholder="Input User"
				onKeyDown={handleAddUser}
			/>

					<ListGroup>
						{
							all.map((task,index)=>{
								return (
									<ListGroup.Item className="newOne" key={index} >
										<p>
											{task.label}
										</p>

										<button className="button" onClick={(e) => handleDelete(index)}>
											<span><i>X</i></span>
										</button>
									</ListGroup.Item>
							)})
						}
					</ListGroup>
				</div>
			</div>
		</div>
	);
};

export default Home;
