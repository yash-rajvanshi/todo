import React from 'react'
import { createContext, useContext, useState } from 'react'

const ToggleContext = createContext();


const TogglerProvider = ({children}) => {

    const [open, setOpen] = useState(true)
    const [openEdit, setOpenEdit] = useState(true)
    const [editingTodo, setEditingTodo] = useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const toggleEdit = () => {
        setOpenEdit(!openEdit);
        console.log(openEdit)
    }

    const handleOpenEdit = (todo) => {
        setEditingTodo(todo);
    };

    return (
        <ToggleContext.Provider value={{open, openEdit,editingTodo, setOpen, setOpenEdit, toggleDrawer, toggleEdit, setEditingTodo, handleOpenEdit}}>
            {children}
        </ToggleContext.Provider>
    )
}

export default TogglerProvider
export const useToggle = () => useContext(ToggleContext);
