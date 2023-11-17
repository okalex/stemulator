import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SpeakerGroupRoundedIcon from '@mui/icons-material/SpeakerGroupRounded';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <SpeakerGroupRoundedIcon />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Stemulator
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
