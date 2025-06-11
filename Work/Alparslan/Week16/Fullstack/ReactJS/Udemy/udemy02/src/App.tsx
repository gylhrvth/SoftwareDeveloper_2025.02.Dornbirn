
import './App.css'
import Login from './components/login.tsx';

const isLoggedIn = false;

export default function App() {
  return (
  <div className="container">
    {isLoggedIn ? <h1>Welcome back!</h1> : <Login />}
  </div>
  )
}

