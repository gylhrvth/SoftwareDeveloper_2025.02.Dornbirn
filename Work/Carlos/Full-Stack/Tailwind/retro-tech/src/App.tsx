/*
# Create a new directory
mkdir retro-tech
cd retro-tech

# Initialize a new React project with Vite
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

npm install -D tailwindcss@3.3.3 postcss@8.4.31 autoprefixer@10.4.15

# Generate Tailwind configuration files
npx tailwindcss init -p
*/

import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;