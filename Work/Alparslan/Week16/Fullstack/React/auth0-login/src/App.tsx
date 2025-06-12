import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import './App.css'

function App() {

  return (
    <>
    <main>
      <h1>Auth0 Login Demo</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </main>
    </>
  )
}

export default App
