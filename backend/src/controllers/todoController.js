import { Todo } from "../models/Todo.js";

export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        })
    }
};

export const createTodo = async (req, res) => {
    try {

        const { title, description, dueDate, priority, tags } = req.body; //here expect userID from frontend

        const todo = await Todo.create({
            title: title,
            description: description,
            dueDate: dueDate,
            user: req.user._id,
            priority: priority,
            tags: tags
        });

        res.status(200).json({
            success: true,
            message: "Todo Created Successfully",
            data: todo
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await Todo.findOne({
            _id: todoId, //id of the todo
        })

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not Found"
            })
        }

        await Todo.deleteOne({ _id: req.params.id });


        res.status(200).json({
            success: true,
            message: "Todo Deleted Successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
}


export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedTodo){
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json({
            success: true,
            message: "Todo Created Successfully",
            data: updatedTodo
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
};