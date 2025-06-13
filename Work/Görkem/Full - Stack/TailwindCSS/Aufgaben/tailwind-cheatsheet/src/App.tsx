
function App() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1732017968601-f46d9badf229?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Person using a computer in a modern workspace"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-center">Headline</h1>
        <p className="text-gray-700 text-center mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nam unde pariatur dolor autem
          impedit architecto debitis id praesentium magni magnam quam maxime incidunt, accusamus
          voluptatibus doloremque.
        </p>
      </div>

      {/* Tailwind CSS Cheat-Sheet Beispiele */}
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Tailwind CSS Cheat-Sheet</h2>
        <div className="mb-4">
          <span className="text-red-500 mr-4">text-red-500</span>
          <span className="font-bold mr-4">font-bold</span>
          <span className="italic mr-4">italic</span>
          <span className="underline mr-4">underline</span>
        </div>
        <div className="mb-4 flex space-x-4">
          <span className="bg-blue-500 text-white px-4 py-2 rounded">bg-blue-500</span>
          <span className="bg-green-500 text-white px-4 py-2 rounded">bg-green-500</span>
          <span className="bg-yellow-500 text-white px-4 py-2 rounded">bg-yellow-500</span>
          <span className="rounded-full bg-gray-200 px-3 py-1">rounded-full</span>
        </div>
        <div className="mb-4 flex space-x-4">
          <span className="p-4 bg-gray-100">p-4</span>
          <span className="m-4 bg-gray-200">m-4</span>
          <span className="mt-4 bg-gray-300">mt-4</span>
          <span className="mb-4 bg-gray-400">mb-4</span>
          <span className="ml-4 bg-gray-500">ml-4</span>
          <span className="mr-4 bg-gray-600">mr-4</span>
        </div>
        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 transition">
            Hover me!
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
            Hover me too!
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <span className="bg-red-500 text-white text-center py-2">Grid Item 1</span>
          <span className="bg-blue-200 px-2">gap-2</span>
          <span className="bg-blue-300 px-2">grid-cols-3</span>
        </div>
        <div className="flex space-x-2 mb-4">
          <span className="bg-gray-200 px-2">flex</span>
          <span className="bg-gray-300 px-2">items-center</span>
          <span className="bg-gray-400 px-2">justify-between</span>
        </div>
      </div>
    </div>
  );
}

export default App
