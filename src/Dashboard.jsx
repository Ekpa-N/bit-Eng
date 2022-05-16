import React, {useEffect, useState} from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import ActiveList from './ActiveList.jsx';


export default function Dashboard({activeUsers, setActiveUsers, onLogout, setIdler}) {
    const { username } = useParams()
    const navigate = useNavigate()
    const[status, setStatus] = useState(activeUsers)
    const[tester, setTester] = useState('')
///////////////////////////////////////////////////////////////////

    useEffect(()=>{
        // debugger
        setStatus(activeUsers)
        if(activeUsers.length > 0) {
            if(!activeUsers.find(user => user.name == username)) {
                navigate('/')
                return
            }
        }

        if(activeUsers.length < 1) {
            navigate('/')
            return
        }
    },[activeUsers])

    useEffect(()=>{
        setTester(status)
    }, [status])

    useEffect(()=>{
        window.addEventListener('blur', watcher)
        return ()=> {window.removeEventListener('blur', watcher)}
    },[])


    window.addEventListener('focus', ()=>{
        window.clearTimeout(idler)
    })
//////////////////////////////////////////////////////////////////////////////////////////////

    let idler
    function watcher() {
            idler = setTimeout(()=>{setIdler(username)},10000)            
        }
        
        


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h3>{username}</h3>
            <div style={{
                display: 'flex',
                alignSelf: 'center',
                width: '200px',
                justifyContent: 'space-between'
            }}>
            <button>Sign-in different user</button>
             <button 
             onClick={()=>{onLogout(username,"self")}}
             >Logout</button>
            </div>
                <h4>Active List</h4>
            <div style={{
                border: '1px solid black',
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {activeUsers.map((user, index) => {
                    if(user.name !== username) {
                      return  <ActiveList 
                    key={index}
                    name={user.name}
                    status={user.status}
                    onLogout={onLogout}
                     />
                    }
                })}
            </div>
        </div>
    )
}

export function DashboardOutlet() {
    return(
        <div style={{
            width:'100%',
            minHeight:'200px',
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'column'
            }}>
            <Outlet />
        </div>
    )
}
