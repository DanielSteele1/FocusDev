import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id,
    });

    const style = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        transition,
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}

export default Draggable;
