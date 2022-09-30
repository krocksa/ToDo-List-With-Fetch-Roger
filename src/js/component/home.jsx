import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {

	const [ input, setInput ] = useState('');
	const [ all, setAll ] = useState([]);
	const [status, setStatus] = useState("to-do");

	function handleAdd(e) {
		if (e.key == "Enter"){
			setAll([...all,{label:input,status:status}])
			setInput("")
		}
	}

	const handleDelete = (currentIndex)=>{
		let newTasks = all.filter((task, index)=> index != currentIndex)
		setAll(newTasks)
	}

	return (
		<div className="title">
			<h2>ToDo List Roger.js</h2>
				<div className="todolist">
					<div className="dentroDe">
						<h3>ALL TASKS</h3>
					<div className="input">
					<input 
						type="text" placeholder="Input Task"
						onChange={(e)=>{setInput(e.target.value)}} 
						value={input} 
						onKeyDown={handleAdd}
					/>
					</div>
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
