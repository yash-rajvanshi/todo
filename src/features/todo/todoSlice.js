import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id:1,text:'helo world'}],


};


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        deleteTodo: () => {}
    }
})


export const {addTodo, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;