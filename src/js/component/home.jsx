import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [ input, setInput ] = useState('');
	const [ tasks, setTasks ] = useState([]);
	const [ status, setStatus ] = useState('to-do');

	function handleEnter(parameter) {
		if (parameter.key === 'Enter') {
				
			setTasks([...tasks,{label:input,status:status}]);
			setInput("")
		}
	}

	function handleDelete(currentIndex) {
		let newTasks = tasks.filter((task, index) => index != currentIndex );
		setTasks(newTasks);
	}

	function handleUpdate(e,currentIndex) {
		let newTasks = tasks.map((task, index) => {
			
			if(index == currentIndex){
				return{...task,status:e.target.value}
			}
			else return task;
});
		setTasks(newTasks);
	}

	return (
		<div className="text-center">
			
			<input type="text" 
				onChange={(e)=>{setInput(e.target.value)}}
				value={input}
				onKeyDown={handleEnter}
			/>

			<select onChange={(e) => 
				{setStatus(e.target.value)}}
				name="taskStatus" id="takStatus">
				<option value="to do">To Do</option>
				<option value="progress">In Progress</option>
				<option value="done">Done</option>
			</select>

			<ListGroup>
				{tasks.map((task,index) => {
						return (
						<ListGroup.Item  className="d-flex list" key={index}>
							<p>
							{task.label}
							</p>
							<select onChange={(e)=> handleUpdate(e,index)} name="taskStatus" id="takStatus">
								<option value="to-do">To Do</option>
								<option value="progress">In Progress</option>
								<option value="done">Done</option>
							</select>
							<button className="button" onClick={(e)=> handleDelete(e,index)}>								
							<span>
								<i>X</i>
							</span>
							</button>
							</ListGroup.Item>);
				})}
			</ListGroup>
		</div>
	);
};

export default Home;
