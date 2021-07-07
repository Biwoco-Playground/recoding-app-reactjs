import React, { useState, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';

const finalSpaceCharacters = [
    {
        id: 'pdf',
        name: 'pdf',
        hide: false
    },
    {
        id: 'nodejs',
        name: 'nodejs',
        hide: false
    },
    {
        id: 'laravel',
        name: 'laravel',
        hide: false
    },
];

const images = [
    {
        id: "0",
        url: '/images/pdf.png',
        answer: ""
    },
    {
        id: "1",
        url: '/images/nodejs.png',
        answer: ""
    },
    {
        id: "2",
        url: '/images/laravel.png',
        answer: ""
    }
];

export default function MatrixQuestion() {

    const [characters, setCharacters] = useState(finalSpaceCharacters);
    const [imagesAnswer, setImageAnswer] = useState(images);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        // const items = Array.from(characters);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);

        // setCharacters(items);   
        if (result.destination.droppableId == "images" && result.source.droppableId == "characters") {
            const characterArr = Array.from(characters);
            const imageArr = Array.from(images);

            if(imageArr[result.destination.index].answer != "") return;

            
            characterArr[result.source.index].hide = true;
            imageArr[result.destination.index].answer = characterArr[result.source.index].name;

            setImageAnswer(imageArr);
            setCharacters(characterArr);

            console.log(result);
        } if (result.destination.droppableId == "images" && result.source.droppableId == "images") {
            const imageArr = Array.from(imagesAnswer);
            
            const swag = imageArr[result.source.index].answer;
            imageArr[result.source.index].answer = imageArr[result.destination.index].answer;
            imageArr[result.destination.index].answer = swag;

            setImageAnswer(imageArr);

            console.log(imageArr);
        }

        // console.log(result);
    }

    useEffect(() => {
        console.log(imagesAnswer);
    }, [imagesAnswer])

    return (
        <div className="question">
            <h4>Maxtrix Sort Question: </h4>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="characters" direction="horizontal">
                    {(provided) => (
                        <ul className="sort-matrix" {...provided.droppableProps} ref={provided.innerRef}>
                            {characters.map(({ id, name, hide }, index) => {
                                if (!hide) return (
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
                <Droppable droppableId="images">
                    {(provided) => (
                        <table className="table-cell" {...provided.droppableProps} ref={provided.innerRef}>
                            {images.map(({ url, answer, id }, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <img src={url} />
                                        </td>
                                        <td>
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div className="answer-contain" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        {(answer) ? <span className="answer">{answer}</span> : ""}
                                                    </div>
                                                )}
                                            </Draggable>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
