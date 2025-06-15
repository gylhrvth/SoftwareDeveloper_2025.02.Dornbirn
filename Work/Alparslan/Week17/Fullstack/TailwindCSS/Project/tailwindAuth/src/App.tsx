import AuthForm from './components/AuthForm';
import ThemeToggle from './components/ThemeToggle';
import ProfilePage from './pages/ProfilePage';
import './index.css'


function App() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
      <ThemeToggle />
      <AuthForm />
      <ProfilePage />
    </div>
  );
}

export default App;
