import React, { useEffect, useState, useRef } from 'react'
import './TagsInput.css'
export const TagsInput = ({ className, name, setViewSubmit, setTags, tags }) => {
    const [text, setText] = useState("")
    const handleKeyDown = (e) => {
        setText(e.target.value)
    };
    const handleKeyEnter = (key) => {
        if (key === "Enter") {
            if (text.trim() !== "") {
                setText("")
                setTags([...tags, text]);
            }
        }
    }
    const saveTags = () => {
        if (text.length === 0) {
            alert("El campo esta vacio")
        }
        else {
            setText("")
            setTags([...tags, text]);
        }
    }
    useEffect(() => {
        setText("")
    }, [tags])
    const removeTag = (index) => {
        setTags(tags.filter((e, i) => i !== index));
    };
    //save reference for dragItem and dragOverItem
    const dragItem = useRef(null)
    const dragOverItem = useRef(null)

    //const handle drag sorting
    const handleSort = () => {
        //duplicate items
        let _tags = [...tags]

        //remove and save the dragged item content
        const draggedItemContent = _tags.splice(dragItem.current, 1)[0]

        //switch the position
        _tags.splice(dragOverItem.current, 0, draggedItemContent)

        //reset the position ref
        dragItem.current = null
        dragOverItem.current = null

        //update the actual array
        setTags(_tags)
    }
    return (
        <>
            <div className="form-control container-tags">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="tag-item"
                        draggable
                        onDragStart={(e) => (dragItem.current = index)}
                        onDragEnter={(e) => (dragOverItem.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}>
                        <span className="tag-text">{tag}</span>
                        <span className="tag-closed" onClick={() => removeTag(index)}>
                            &times;
                        </span>
                    </div>
                ))}
            </div>
            <div className='tags-input-container'>
                <input
                    onFocus={() => setViewSubmit(false)}
                    onBlur={() => setViewSubmit(true)}
                    onChange={(e) => handleKeyDown(e)}
                    onKeyDown={(e) => handleKeyEnter(e.key)}
                    type="text"
                    name={name}
                    value={text}
                    placeholder="Ingrese... "
                    className={`${className} tags-input`}
                />
                <button
                    name={name}
                    type="button"
                    className='btn btn-success'
                    onClick={() => saveTags()}>Agregar</button>
            </div>

        </>
    )
}
