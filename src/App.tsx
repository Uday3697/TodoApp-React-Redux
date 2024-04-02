import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserForm from './pages/userForm'
import Home from './Home'

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootRoute
