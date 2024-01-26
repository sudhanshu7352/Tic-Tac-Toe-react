import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [newName, setNewName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);


    const handleName = () => {
        setIsEditing(editing => !editing);
        if(isEditing){
            onNameChange(symbol,newName)
        }
    }
    const handleChange = (event) => {
        setNewName(event.target.value)
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {!isEditing ? (<span className="player-name">{newName}</span>) : <input type="text" required value={newName} onChange={handleChange} />}

                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleName}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
