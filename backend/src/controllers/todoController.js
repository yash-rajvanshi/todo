import { Todo } from "../models/Todo";

export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({userId: req.user._id}).sort({createdAt: -1});

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
}