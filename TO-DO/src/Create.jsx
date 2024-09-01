import React, { useState } from 'react';
import axios from 'axios';

function Create({ refreshTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim()) {
            axios.post('http://localhost:3001/add', { task })
                .then(() => {
                    setTask('');
                    refreshTodos(); 
                })
                .catch(err => console.log(err));
        } else {
            alert('Please enter a task.'); 
        }
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
