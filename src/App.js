// Challenge: Implement a Todo App
// In this challenge, you will build a todo app using React. The app should allow users to add and delete tasks, as well as mark tasks as complete.
// Requirements
// The app should display a list of tasks.
// Users should be able to add a new task to the list.
// Users should be able to mark a task as complete.
// Users should be able to delete a task from the list.
// The app should have a button that allows users to clear all completed tasks.
// The app should display the number of tasks remaining.
// Constraints
// You must use React to build the app.
// You may use any CSS framework or library of your choice to style the app.
// You may use any state management library of your choice (e.g. Redux, MobX), or you may use React's built-in state management.

import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskCompleteToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const tasksRemaining = tasks.filter((task) => !task.completed).length;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => handleTaskCompleteToggle(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {tasksRemaining} task{tasksRemaining !== 1 && "s"} remaining
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
