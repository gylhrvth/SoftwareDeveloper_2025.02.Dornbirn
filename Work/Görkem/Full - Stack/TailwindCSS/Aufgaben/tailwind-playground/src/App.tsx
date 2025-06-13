import Header from './components/Header';
import ColorDemo from './components/ColorDemo';
import SpacingDemo from './components/SpacingDemo';
import ButtonDemo from './components/ButtonDemo';
import ResponsiveDemo from './components/ResponsiveDemo';
import './index.css';
import { ThemeProvider } from './components/ThemeContext';

function App() {

  return (
    <>
    <ThemeProvider>
    <div className='min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors'>
      <Header />
      <main className='p-6'>
        <h2 className='text-2xl font-bold mb-8'>Tailwind CSS</h2>
        <p>Hier werden gleich die Tailwind-Demos eingeblendet.</p>
        <ColorDemo />
        <SpacingDemo />
        <ButtonDemo />
        <ResponsiveDemo />
      </main>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
