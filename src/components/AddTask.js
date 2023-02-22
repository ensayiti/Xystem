import React from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
// import { Add as AddIcon, AddTask as AddTaskIcon } from '@mui/icons-material';
import { textFieldStyle } from "../theme/customStyles";

import { Tooltip } from "antd";
import {
  EditOutlined as AddTaskIcon,
  PlusCircleOutlined as AddIcon,
} from "@ant-design/icons";

const AddTask = ({ inputValue, setInputValue, addTask, isEditing }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      id: Date.now(),
      value: inputValue,
      checked: false,
    });
    setInputValue("");
  };

  return (
    <Box mt={4} mb={5} component="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="Tambahkan..."
        required
        autoFocus
        fullWidth
        sx={textFieldStyle}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {!isEditing ? (
                <Tooltip title="Tambah">
                  <IconButton type="submit" aria-label="add">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Ubah">
                  <IconButton type="submit" aria-label="update">
                    <AddTaskIcon />
                  </IconButton>
                </Tooltip>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AddTask;
