import { Avatar, Box, Button, Chip, Container, Drawer, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react';



const Menu = ({ openn }) => {

    return (
        <>
            <Box>
                <Drawer open={openn} sx={{
                    width: 350, '& .MuiDrawer-paper': {
                        width: 350,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        
                    }
                }} variant="persistent" onClose={() => toggleDrawer()}>
                    <Box sx={{backgroundColor: '#f5f5f5', m:'1rem', height:'100%', borderRadius: '12px'}}>
                        <Typography sx={{m:'1rem'}} variant='h5'>Menu</Typography>
                        <Typography sx={{mx:'1rem'}} variant='p'>LIST</Typography>
                        <Stack>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1,
                                    // backgroundColor: "#f9f9f9",
                                }}
                            >
                                {/* Left Side: Icon + Text */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {/* <ChevronRightIcon fontSize="small" /> */}
                                    <Typography variant="body1" fontWeight={500}>
                                        Upcoming
                                    </Typography>
                                </Box>

                                {/* Right Side: Count */}
                                <Chip
                                    label="1"
                                    size="small"
                                    sx={{
                                        backgroundColor: "#f1f1f1",
                                        fontWeight: "bold",
                                    }}
                                />

                                
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1,
                                    // backgroundColor: "#f9f9f9",
                                }}
                            >
                                {/* Left Side: Icon + Text */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body1" fontWeight={500}>
                                        Upcoming
                                    </Typography>
                                </Box>

                                {/* Right Side: Count */}
                                <Chip
                                    label="1"
                                    size="small"
                                    sx={{
                                        backgroundColor: "#f1f1f1",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Box>


                </Drawer>
            </Box>
        </>
    )
}

export default Menu
