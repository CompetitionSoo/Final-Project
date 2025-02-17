import React from 'react';

const Todolist = () => {
    return(
        <div className='Container'>
            <header className='header'>
                <h1> 오늘의 할일 목록</h1>
            </header>

            <section className='input-container'>
                <div className='todo-input-wrapper'>
                    <input type='text' className='todo-input' placeholder='오늘의 할일을 적어보세요!'/>
                    <button className='todo-input-button'>추가</button>
                </div>
            </section>

            <section className="todo-list-section">
                <ul className="todo-list">
                    <li className="todo-item">
                        <span className="task-text">Create a Pen</span>
                        <button className="complete-button">Complete</button>
                        <button className="delete-button">Delete</button>
                    </li>
                    <li className="todo-item">
                        <span className="task-text">Go for a walk</span>
                        <button className="complete-button">Complete</button>
                        <button className="delete-button">Delete</button>
                    </li>
                </ul>
            </section>

            
        </div>
    )
}


export default Todolist;