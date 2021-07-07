import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css'

const finalSpaceCharacters = [
    {
        id: 'sagga',
        name: '1'
    },
    {
        id: 'pollen',
        name: '2'
    },
    {
        id: 'loney',
        name: '3'
    },
];

export default function SortQuestion() {

    const [characters, setCharacters] = useState(finalSpaceCharacters);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCharacters(items);
        console.log(result);
    }

    useEffect(() => {
        console.log(characters);
    }, [characters])

    return (
        <div className="question">
            <h3>Sort Choice: </h3>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {characters.map(({ id, name }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li className="answer" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                {name}
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}
