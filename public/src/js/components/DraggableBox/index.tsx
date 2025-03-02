import React, { useState } from 'react';

type Props = {
    className?: string,
    children?: any,
    dragData: any,
    dragIcon?: string,
    ref?: any
};

export function DraggableBox({ className, children, dragData, dragIcon, ref }: Props) {

    const [mouseDown, setMouseDown] = useState(false);

    function handleDragStart(event) {
        event.preventDefault();
        console.log("Drag start", dragData);
        window.api.startDrag(dragData, dragIcon);
    }

    function handleMouseDown() {
        setMouseDown(true);
    }

    function handleMouseUp() {
        setMouseDown(false);
    }

    const mouseStyle = {
        cursor: mouseDown ? "cursor-grabbing" : "cursor-grab"
    };

    return (
        <div onDragStart={handleDragStart} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} draggable={true} ref={ref} className={`${mouseStyle} ${className}`}>
            {children}
        </div>
    );
}
