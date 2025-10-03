import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    items: [],
    loading: false,
    error: null
};

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { getState, rejectWithValue }) =>{
        try {
            // const storedUser = JSON.parse(localStorage.getItem("userInfo"));
            const token = getState().auth.userInfo?.token;
            const config = token
            ? {headers: { Authorization: `Bearer ${token}` }}
            : {};
            const { data } = await axios.get(`http://localhost:8080/api/todos/`, config);
            return Array.isArray(data) ? data : data.data ?? [];
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const createTodo = createAsyncThunk(
    "todos/createTodo",
    async ( todoData, { rejectWithValue }) =>{
        try {
            // const storedUser = JSON.parse(localStorage.getItem("userInfo"));
            const token = getState().auth.userInfo?.token;
            const config = token
            ? {headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}
            : {};
            const { data } = await axios.post(`http://localhost:8080/api/todos/`, todoData , config);
            return data.data || data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

// UPDATE TODO
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = getState().auth.userInfo?.token;
            const config = token
            ? {headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}
            : {};
      
      const { data } = await axios.put(
        `http://localhost:8080/api/todos/${id}`, 
        updates, 
        config
      );
      // Return the updated todo
      return data.data || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE TODO
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const token = getState().auth.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      await axios.delete(`http://localhost:8080/api/todos/${id}`, config);
      // Return the id so we know which todo to remove
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// // TOGGLE TODO COMPLETION (optional but useful)
// export const toggleTodoComplete = createAsyncThunk(
//   "todos/toggleComplete",
//   async ({ id, completed }, { rejectWithValue }) => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("userInfo"));
//       const token = storedUser?.token;
//       const config = {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };
      
//       const { data } = await axios.patch(
//         `http://localhost:8080/api/todos/${id}`, 
//         { completed }, 
//         config
//       );
//       return data.data || data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );



const todosSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        // local optimistic helpers if needed
        clearTodoState: (state) =>{
            state.items = [];
            state.loading= false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        
        //fetch
        .addCase(fetchTodos.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) =>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })


        //create
        .addCase(createTodo.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createTodo.fulfilled, (state, action) =>{
            state.loading = false;
            // Add the new todo to the beginning of the array
            state.items.unshift(action.payload);
        })
        .addCase(createTodo.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })


        // UPDATE TODO
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        // Find and update the todo in the array
        const index = state.items.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE TODO
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the todo from the array
        state.items = state.items.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //   // TOGGLE COMPLETE
    //   .addCase(toggleTodoComplete.fulfilled, (state, action) => {
    //     const index = state.items.findIndex(todo => todo._id === action.payload._id);
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //   });


    }
});


export const { clearTodoState } = todosSlice.actions;

export const selectAllTodos = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;
export default todosSlice.reducer;