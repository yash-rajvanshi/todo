import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, 
        },
        dueDate: { 
            type: Date 
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        tags: [{
            type: String 
        }],

        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }

);

export const Todo = mongoose.model("Todo", todoSchema);