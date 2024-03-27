import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

function App() {
  const [allTasks, setAllTasks] = useState([]);

  //add to localStorage
  useEffect(() => {
    if (allTasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  //read from localStorage
  // useEffect(() => {
  //   const tasks = JSON.parse(localStorage.getItem("AllTasks"));
  //   setAllTasks(tasks);
  // }, []);

  //to add tasks
  function addTask(name) {
    setAllTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

  //to remove taska
  function removeTask(indexToRemove) {
    setAllTasks((prev) => {
      return prev.filter((taskObj, index) => {
        return index !== indexToRemove;
      });
    });
  }

  function renameTask(index, newName) {
    setAllTasks((prev) => {
      const renamedTask = [...prev];
      renamedTask[index].name = newName;
      return renamedTask;
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setAllTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const completedTasks = allTasks.filter((t) => t.done).length;
  const totalTasks = allTasks.length;

  function getMessage() {
    const percentage = (completedTasks / totalTasks) * 100;
    if (percentage === 0) {
      return "Let's do it! 😀";
    }
    if (percentage === 100) {
      return "Nice Job Today! 🥳";
    }
    return "Keep It Going! 👍";
  }

  return (
    <>
      <p>
        {completedTasks}/{totalTasks} Completed <br></br>
        {getMessage()}
      </p>
      <TaskForm onAdd={addTask} />
      {allTasks.map((task, index) => (
        <Task
          {...task}
          onRemane={(newName) => renameTask(index, newName)}
          onDelete={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
        />
      ))}
    </>
  );
}

export default App;
