import React, { useState } from 'react';

type Props = {
    children?: JSX.Element,
    dragData: any,
    ref?: any
};

export function DraggableBox({ children, dragData, ref }: Props) {

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

    return (
        <div onDragStart={handleDragStart} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} draggable={true} ref={ref}>
            {children}
        </div>
    );
}
