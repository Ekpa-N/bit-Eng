import React, {useState} from 'react'


export default function Login(props) {
    const {onNameChange, userName, onRegister, onLogin} = props
    

    return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '70px',
                justifyContent: 'space-between'
            }}>
             <label style={{
                 alignSelf: 'center'
             }} htmlFor='username'>
                 Enter your Username
            </label>
             <input onChange={onNameChange} id='username' type='text' value={userName}></input>
            <div style={{
                display: 'flex',
                alignSelf: 'center',
                width: '120px',
                justifyContent: 'space-between'
            }}>
            <button onClick={onRegister}>Register</button>
             <button onClick={onLogin}>Login</button>
            </div>
            </div>
    )
}