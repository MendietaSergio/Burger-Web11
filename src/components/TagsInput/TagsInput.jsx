import React, { useEffect, useState } from 'react'
import './TagsInput.css'
export const TagsInput = ({ viewIngredients, className, name, setViewSubmit, setTags, tags }) => {
    const [text, setText] = useState("")
    const handleKeyDown = (e) => {
        setText(e.target.value)
    };
    const handleKeyEnter = (key) => {
        console.log(text);
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
    return (
        <>
            <div className="form-control container-tags">
                {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
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
