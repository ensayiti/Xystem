import React from "react";
import { Stack } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, deleteTask, checkTask, editTask, time }) => {
  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      {
        // Here, Sort method is used to place the recently added Task at the Top.
        tasks
          .sort((a, b) => b.id - a.id)
          .map((taskItem) => (
            <TaskItem
              key={taskItem.id}
              taskItem={taskItem}
              deleteTask={deleteTask}
              checkTask={checkTask}
              editTask={editTask}
              time={taskItem.time}
            />
          ))
      }
    </Stack>
  );
};

export default TaskList;
