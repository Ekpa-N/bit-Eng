import React, {useState, useEffect} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./Login.jsx"
import Dashboard, {DashboardOutlet} from "./Dashboard.jsx";

const initialFormData = {
  userName: '',
};

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [registeredUsers, setRegisteredUsers] = useState([])
  const[activeUsers, setActiveUsers] = useState([])
  const [alert, setAlert] = useState("")
  const navigate = useNavigate()
  
/////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(!localStorage.registeredUsers){
      setRegisteredUsers([])
      return
    }
    setRegisteredUsers(JSON.parse(localStorage.registeredUsers))
  },[])

  useEffect(() => {
    if(!localStorage.activeUsers){
      setActiveUsers([])
      return
    }
    setActiveUsers(JSON.parse(localStorage.activeUsers))
  },[])

  useEffect(()=>{},[activeUsers])

  window.addEventListener('storage', (e)=> {
    if(e.key === 'registeredUsers') {
      setRegisteredUsers(JSON.parse(localStorage.registeredUsers))
    }

    if(e.key === 'activeUsers') {
      if(!localStorage.activeUsers){
        setActiveUsers([])
        return        
      }
      setActiveUsers(JSON.parse(localStorage.activeUsers))
    }
  })

  ///////////////////////////////////////////////////////////////////////////////////////
  const onRegister = () => {
    let regUserName = formData.userName
    let newRegList = registeredUsers
    if(regUserName === "") {
      setAlert("Please enter a username")
      return
    }
    if(registeredUsers.includes(regUserName)) {
      setAlert("User already registered")
      return
    }
    newRegList = newRegList.concat(regUserName)
    newRegList = JSON.stringify(newRegList)
    localStorage.setItem('registeredUsers', newRegList)
    newRegList = localStorage.getItem('registeredUsers')
    newRegList = JSON.parse(newRegList)
    setRegisteredUsers(newRegList)    
  }
  /////////////////////////////////////////////////////////////////////////
  const setIdler = (username) => {
    
    let withIdleState = JSON.parse(localStorage.activeUsers).map(user => {
      if(user.name == username) {
          user = {...user, status: "idle"}
      }
      return user
  })
  
    localStorage.setItem('activeUsers', JSON.stringify(withIdleState))
    setActiveUsers(JSON.parse(localStorage.activeUsers))
    let actives = activeUsers
    
    console.log("idle")
  }
//////////////////////////////////////////////////////////////////////////////////
  
      
      const onLogin = () => {
        let thisUser = {name: formData.userName, status: "active"}
        if(!registeredUsers.includes(thisUser.name)){
          setAlert("This user is not registered")
            return
          }        
          if(!localStorage.activeUsers) {
            let newActiveList = []
           newActiveList = newActiveList.concat(thisUser)              
          localStorage.setItem('activeUsers', JSON.stringify(newActiveList))
          setActiveUsers(JSON.parse(localStorage.activeUsers))
          let rerouter = setTimeout(()=>{
            setAlert("")
            navigate('/dashboard/'+thisUser.name)
          },50)
          return
        }

        if(localStorage.activeUsers) {
          if(activeUsers.find(user => user.name == thisUser.name)) {
            setAlert("This user is already logged in")           
            return
          }
          let newActiveList = JSON.parse(localStorage.activeUsers)
          newActiveList = newActiveList.concat(thisUser)
          localStorage.setItem('activeUsers', JSON.stringify(newActiveList))
          setActiveUsers(JSON.parse(localStorage.activeUsers))    
          
          let rerouter = setTimeout(()=>{
            setAlert("")
              navigate('/dashboard/'+thisUser.name)
            },50)
            return      
        }
      }
//////////////////////////////////////////////////////////////////////////////
    
      const onLogout = (name, type) => {
        let remainingActiveUsers = activeUsers.filter(users=> (
            users.name != name
        ))       
             
        if(remainingActiveUsers.length > 0) {
            localStorage.setItem('activeUsers', JSON.stringify(remainingActiveUsers))
            setActiveUsers(JSON.parse(localStorage.activeUsers))
          } else {
            localStorage.removeItem("activeUsers")       
            setActiveUsers([])
        }
        
    }
/////////////////////////////////////////////////////////
      const onNameChange = e => {
          // debugger;
          setFormData({
            userName: e.target.value,
          });
        };
    return(
      
        <div style={{
          margin: 'auto',
          width: '300px',
          marginTop: '50px',
          border:'1px solid black',
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center'
        }}>
          <h5>{alert}</h5>
          <Routes>
        <Route path="/" 
        element={ 
        <Login 
        onNameChange={onNameChange}
        userName={formData.userName}
        onRegister={onRegister}
        onLogin = {onLogin} 
        />}
        >
      </Route>
      <Route path="dashboard" element={ <DashboardOutlet />}>       
      <Route path=":username" element=
      {<Dashboard
        activeUsers={activeUsers}
        setActiveUsers={setActiveUsers}
        onLogout={onLogout}
        setIdler = {setIdler}
        />}></Route>       
      </Route>
      </Routes>
      
        </div>
    )
}