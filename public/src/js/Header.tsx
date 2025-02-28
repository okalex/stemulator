import React from 'react';
import { useAppStore } from './stores/AppStore';
import { Typography } from '@material-tailwind/react';

export default function Header() {

    const appStore = useAppStore();

    return (
        <div>
            <Typography type="h1" className="text-red-500">Stemulator</Typography>
        </div>
    );
};
