import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Login from './Components/Login'
import Notes from './Components/Notes'
import Register from './Components/Register'
import ViewNote from './Components/ViewNote'
import PrivateRoute from './Components/PrivateRoute'
const Allroutes = () => {
  return (
    <div>
<Routes>
<Route path="/" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/notes" element={<PrivateRoute><Notes/></PrivateRoute>}/>
<Route path="/details" element={<PrivateRoute><ViewNote/></PrivateRoute>}/>
</Routes>
    </div>
  )
}

export default Allroutes