import { Badge, Box, Button, Chip, Collapse, Container, Divider, Fab, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useToggle } from '../context/Toggler.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo,  createTodo, selectAllTodos, selectTodosLoading, selectTodosError } from '../features/todo/todoSlice';


const TodoList = ({ onToggle, onToggleEdit }) => {
    const {toggleEdit, toggleDrawer} = useToggle();
    const dispatch = useDispatch();
    const todos = useSelector(selectAllTodos);
    const loading = useSelector(selectTodosLoading);
    const error = useSelector(selectTodosError);

    const [checked, setChecked] = useState([]);
    const [open, setOpen] = useState({});

    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);


    const handleToggleCollapse = (value) => {
        setOpen((prev) => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    if (loading) return <div>Loading todos…</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    // Calculate incomplete todos count
    const incompleteTodosCount = todos?.length - checked.length || 0;

    return (
        <Container >
            <Box sx={{
                ml: onToggle ? 0 : `-${240}px`,
                mr: onToggleEdit ? 0 : `-${400}px`,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Typography variant='h1'>Today</Typography>
                    <Tooltip title="Total todos to complete" arrow>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "64px",
                                height: "64px",
                                border: "1px solid grey",
                                borderRadius: "12px",
                                p: 1
                            }}
                        >
                            <Typography sx={{ m: 0 }} variant='h3'>
                                {incompleteTodosCount}
                            </Typography>
                        </Box>

                    </Tooltip>

                </Box>

                <List sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
                    {todos?.map((t) => (
                        <React.Fragment key={t._id}>
                            <ListItem
                                sx={{ mt: '1rem' }}
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="expand"
                                        onClick={() => handleToggleCollapse(t._id)}
                                    >
                                        {open[t._id] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                }
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(t._id)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.includes(t._id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={`checkbox-list-label-${t._id}`}
                                        primary={<Typography variant='subtitle1'> {t.title}</Typography>}
                                    />
                                    {t.dueDate && (
                                        <Chip
                                            label={new Date(t.dueDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                            variant="outlined"
                                            size="small"
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>

                            <Collapse in={open[t._id]}>
                                <Stack spacing={2} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                                    {t.description && (
                                        <Typography variant="body2">{t.description}</Typography>
                                    )}

                                    {t.priority && (
                                        <Chip label={`Priority: ${t.priority}`}
                                            variant="outlined"
                                            color={
                                                t.priority.toLowerCase() === 'high' ? 'error' :
                                                    t.priority.toLowerCase() === 'medium' ? 'warning' :
                                                        'success'} />
                                    )}

                                    {t.tags && t.tags.length > 0 && (
                                        <Grid
                                            container
                                            spacing={1}
                                            direction="row"
                                            sx={{
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                        >
                                            {t.tags.map((tag, index) => (
                                                <React.Fragment key={tag}>
                                                    <Grid size="auto">
                                                        <Chip label={tag} variant="outlined" size="small" />
                                                    </Grid>
                                                    {index < t.tags.length - 1 && (
                                                        <Divider orientation="vertical" variant="middle" flexItem />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    )}
                                </Stack>
                            </Collapse>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
            <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', bottom: '10%', right: '40%' }}>
                      <Fab onClick={toggleDrawer} color="primary" aria-label="add">
                        <AddIcon />
                      </Fab>
                      <Fab onClick={toggleEdit} color="secondary" aria-label="edit">
                        <EditIcon />
                      </Fab>
                    </Box>
        </Container>
    );
};

export default TodoList;