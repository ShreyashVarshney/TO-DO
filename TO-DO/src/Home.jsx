
import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; 

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleToggle = (id, done) => {
        axios.put(`http://localhost:3001/update/${id}`, { done: !done })
            .then(() => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: !done } : todo
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>TO-DO LIST</h2>
            <Create refreshTodos={() => {
                axios.get('http://localhost:3001/get')
                    .then(result => setTodos(result.data))
                    .catch(err => console.log(err));
            }} />
            <br />
            {todos.length === 0 ? (
                <div><h2>No Record</h2></div>
            ) : (
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handleToggle(todo._id, todo.done)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill className='icon' />
                            ) : (
                                <BsCircleFill className='icon' />
                            )}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
