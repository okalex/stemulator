import { Box } from '@mui/material';
import React, { useState } from 'react';

type Props = {
    children?: JSX.Element,
    dragData: any,
    sx?: object,
    ref?: any
};

export function DraggableBox({ children, dragData, sx, ref }: Props) {

    const [mouseDown, setMouseDown] = useState(false);

    function handleDragStart(event) {
        event.preventDefault();
        console.log("Drag start", dragData);
        window.api.startDrag(dragData);
    }

    function handleMouseDown() {
        setMouseDown(true);
    }

    function handleMouseUp() {
        setMouseDown(false);
    }

    const mouseStyle = {
        cursor: mouseDown ? "grabbing" : "grab"
    };

    const style = {
        ...sx,
        ...mouseStyle,
    }

    return (
        <Box onDragStart={handleDragStart} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} sx={style} draggable={true} ref={ref}>
            {children}
        </Box>
    );
}