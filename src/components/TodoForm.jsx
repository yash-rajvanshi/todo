import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { createTodo, updateTodo } from '../features/todo/todoSlice';
import { useToggle } from '../context/Toggler.jsx';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Stack,
  Typography,
  useTheme,
  TextField,
  MenuItem,
} from "@mui/material";

const TodoForm = ({ openn, toggleDrawer, onSubmit, }) => {
  const { editingTodo} = useToggle();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When editingTodo changes, populate the form
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        dueDate: editingTodo.dueDate 
          ? new Date(editingTodo.dueDate).toISOString().split('T')[0] 
          : "",
        priority: editingTodo.priority || "medium",
        tags: editingTodo.tags || [],
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        tags: [],
      });
    }
  }, [editingTodo]);

  // handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add tags
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !formData.tags.includes(tagInput)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }));
      setTagInput("");
    }
  };

  // remove tags
  const handleDeleteTag = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      tags: [],
    });
    setTagInput("");
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingTodo) {
        // UPDATE existing todo
        await dispatch(updateTodo({ 
          id: editingTodo._id, 
          updates: formData 
        })).unwrap();
        console.log("Todo updated successfully!");
      } else {
        // CREATE new todo
        await dispatch(createTodo(formData)).unwrap();
        console.log("Todo created successfully!");
      }
      
      // Reset form and close drawer on success
      resetForm();
      toggleDrawer();
    } catch (error) {
      console.error("Failed to save todo:", error);
      // Optionally show error message to user
      alert(`Failed to ${editingTodo ? 'update' : 'create'} todo: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Box>
      <Drawer
      anchor="right"
        open={openn}
        sx={{
          width: 350,
          "& .MuiDrawer-paper": {
            width: 350,
            boxSizing: "border-box",
            borderLeft: "none",
          },
        }}
        variant="persistent"
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            m: "1rem",
            height: "100%",
            borderRadius: "12px",
            p: 2,
            overflowY: "auto",
          }}
        >
          <Typography sx={{ mb: 2 }} variant="h5">
            Create Todo
          </Typography>

          {/* Todo Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />

              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />

              <TextField
                label="Priority"
                name="priority"
                select
                value={formData.priority}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>

              {/* Tags Input */}
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  label="Add Tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  fullWidth
                  disabled={isSubmitting}
                />
                <Button variant="contained" onClick={handleAddTag}
                disabled={isSubmitting || !tagInput.trim()}>
                  Add
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    color="primary"
                    variant="outlined"
                    disabled={isSubmitting}
                  />
                ))}
              </Stack>

              <Button type="submit" variant="contained" fullWidth>
                Save Todo
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TodoForm;
