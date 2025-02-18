import React, { useState, useEffect } from 'react';
import './layout/Todolist.css';

const Todolist = () => {
const [tasks, setTasks] = useState<string[]>([]); // 할 일 목록 상태
const [newTask, setNewTask] = useState<string>(''); // 새 할 일 입력 상태

// 로컬 스토리지에서 할 일 목록을 불러오는 함수
useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
    setTasks(JSON.parse(savedTasks)); // 로컬 스토리지에서 불러온 데이터로 상태 업데이트
    }
}, []);

// 할 일 목록을 로컬 스토리지에 저장하는 함수
useEffect(() => {
    if (tasks.length > 0) {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // 상태가 변경되면 로컬 스토리지에 저장
    }
}, [tasks]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value); // 입력값을 상태에 저장
};

const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 방지
    if (newTask.trim()) {
    setTasks([...tasks, newTask]); // 새 할 일을 목록에 추가
    setNewTask(''); // 입력창 초기화
    }
};

const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // 해당 할 일 삭제
    setTasks(updatedTasks);
};

const handleCompleteTask = (index: number) => {
    // 완료된 할 일은 다른 방식으로 표시하거나 상태 변경 가능
    // 여기서는 삭제 예시로 보여줌
    handleDeleteTask(index);
};

return (
    <div className='container'>
    <header className='header'>
        <h1>오늘의 할 일 목록</h1>
    </header>

    <section className='input-container'>
        <div className='todo-input-wrapper'>
        <input
            type='text'
            className='todo-input'
            placeholder='오늘의 할 일을 적어보세요!'
            value={newTask}
            onChange={handleInputChange}
        />
        
        <button className='todo-input-button' onClick={handleAddTask}>
            추가
        </button>
        </div>
    </section>

    <section className='todo-list-section'>
        <ul className='todo-list'>
        {tasks.map((task, index) => (
            <li key={index} className='todo-item'>
            <span className='task-text'>{task}</span>
            <button
                className='complete-button'
                onClick={() => handleCompleteTask(index)}
            >
                완료
            </button>
            <button
                className='delete-button'
                onClick={() => handleDeleteTask(index)}
            >
                삭제
            </button>
            </li>
        ))}
        </ul>
    </section>
    </div>
);
};

export default Todolist;
