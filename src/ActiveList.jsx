import React from 'react'

export default function ActiveList({name, onLogout, status}) {
    return(
        <div style={{
            width: '49%',
            display: 'flex',
            flexDirection: 'column',
            height: '70px',
            alignItems: 'center'
            }}>
            <div style={{width: '90px', height: '20px'}}>{name}</div>
            <div style={{width: '90px', height: '20px'}}>{status}</div>
            <button 
            onClick={()=>{onLogout(name)}} 
            style={{marginTop: '5px', width: '60px'}}>Logout</button>
        </div>
    )
}