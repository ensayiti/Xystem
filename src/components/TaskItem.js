import React, { useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import { Tooltip } from "antd";
// import { Edit, Delete } from '@mui/icons-material';
import { Checkbox } from "antd";
import {
  EditOutlined as Edit,
  DeleteOutlined as Delete,
} from "@ant-design/icons";
import { checkedItemStyle, taskItemStyle } from "../theme/customStyles";

const TaskItem = ({ taskItem, deleteTask, checkTask, editTask }) => {
  const { id, value, checked } = taskItem;

  // this state is just scoped to the individual instance of the checkboxes and also allows to update their values.
  const [isChecked, setIsChecked] = useState(checked);

  const handleIsChecked = () => {
    setIsChecked((prevState) => !prevState);
    checkTask(id);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={!isChecked ? taskItemStyle : checkedItemStyle}
    >
      <Stack direction="row" alignItems="center">
        <Checkbox
          name={value}
          checked={isChecked}
          onChange={handleIsChecked}
          disableRipple
        />
        <Typography
          variant="h6"
          ml={1.6}
          sx={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          {value}
        </Typography>
      </Stack>
      <Stack direction="row" columnGap={2}>
        <Tooltip title="Ubah">
          <IconButton aria-label="edit" onClick={() => editTask(taskItem)}>
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Hapus">
          <IconButton aria-label="delete" onClick={() => deleteTask(id)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default TaskItem;
