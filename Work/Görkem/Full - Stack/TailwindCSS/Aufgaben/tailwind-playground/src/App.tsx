import Header from './components/Header';
import ColorDemo from './components/ColorDemo';
import './index.css';
import { ThemeProvider } from './components/ThemeContext';

function App() {

  return (
    <>
    <ThemeProvider>
    <div className='min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors'>
      <Header />
      <main className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>Tailwind CSS</h2>
        <p>Hier werden gleich die Tailwind-Demos eingeblendet.</p>
        <ColorDemo />
      </main>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
