import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [newTaskInput, setnewTaskInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(newTaskInput);
    setnewTaskInput("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskInput}
          onChange={(e) => setnewTaskInput(e.target.value)}
          placeholder="Input Your Task..."
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default TaskForm;
