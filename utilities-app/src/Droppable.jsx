import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    const style = {
        display: 'flex',
        backgroundColor: isOver ? 'transparent' : 'transparent', 
        flexDirection: 'row',
        padding: '10px',
        maxWidth: '100%',
        border: '2px dashed #ccc',
        borderRadius: '5px',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

export default Droppable;