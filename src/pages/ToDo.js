import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoBoxStyle, taskBoxStyle } from "../theme/customStyles";
import { AddTask, Header, TaskList, WelcomeScreen } from "../components";

import { useAuthValue } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "antd";

function ToDo() {
  const { currentUser } = useAuthValue();

  const [tasks, setTasks] = useLocalStorage("todoList", []);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  // Adding a new task |or| Updating an existing task
  const addTask = (task) => {
    const newTask = { ...task, time: new Date().toISOString() };
    !isEditing
      ? setTasks((prevState) => [...prevState, newTask])
      : setTasks((prevState) => [
          ...prevState.map((item) => {
            if (item.id === editedItemId) {
              return {
                ...item,
                value: inputValue,
              };
            }
            return item;
          }),
        ]);
    setEditedItemId(null);
    setIsEditing(false);
  };

  // Deleting a task
  const deleteTask = (taskId) => {
    setTasks((prevState) => [
      ...prevState.filter((item) => item.id !== taskId),
    ]);
  };

  // toggling the Checked state of a task
  const checkTask = (taskId) => {
    setTasks((prevState) =>
      prevState.map((item) => {
        if (item.id === taskId) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      })
    );
  };

  // Editing a task
  const editTask = (taskItem) => {
    const itemToEdit = tasks.find((item) => item.id === taskItem.id);
    setInputValue(itemToEdit.value);
    setIsEditing(true);
    setEditedItemId(taskItem.id);
  };

  return (
    <Box sx={todoBoxStyle}>
      <Header />

      <AddTask
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTask={addTask}
        isEditing={isEditing}
      />

      <Paper elevation={8} sx={taskBoxStyle}>
        {tasks?.[0] ? (
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            checkTask={checkTask}
            editTask={editTask}
          />
        ) : (
          <WelcomeScreen />
        )}
      </Paper>
      <div className="todo-center">
        <div className="todo-profile">
          <h1>Profile</h1>
          <p>Email: {currentUser?.email}</p>
          <p>Verified: {`${currentUser?.emailVerified}`}</p>
          <hr />
          <Button className="button">
            <Link to="/">Back to profile</Link>
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default ToDo;
