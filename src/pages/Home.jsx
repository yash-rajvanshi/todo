import React, { useState } from 'react'
import TextPressure from '../components/TextPressure.jsx'
import Menu from '../components/Menu';
import { Box, Button, Fab, Tab, Tabs } from '@mui/material';
import TodoList from '../components/TodoList.jsx';
import TodoForm from '../components/TodoForm.jsx';
import { useToggle } from '../context/Toggler.jsx';

let userName;
const storedUser = JSON.parse(localStorage.getItem("userInfo"));
if (storedUser) {
  userName = storedUser.name || "User";
}

const Home = () => {

  const { open, openEdit, editingTodo} = useToggle();


  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Menu openn={open} />
        <TodoList onToggle={open} onToggleEdit={openEdit} />
        <TodoForm openn={openEdit} editingTodo={editingTodo}/>
  
      </Box>

    </>
  )
}

export default Home
