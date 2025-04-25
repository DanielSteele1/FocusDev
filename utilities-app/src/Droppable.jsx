import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable({ id, children, isOver }) {
    const { setNodeRef } = useDroppable({
        id: 'unique-id',
        isOver,
    });

    const style = {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        padding: '10px',
        minWidth: '100%',
        border: '2px dashed #1DB954',
        borderRadius: '15px',
        minHeight: '310px',
        margin: '0 auto 0 0',
        marginLeft: '20px'
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

export default Droppable;