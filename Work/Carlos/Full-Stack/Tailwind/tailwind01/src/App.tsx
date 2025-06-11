

export default function App() {
  
return (
    
    <div className="p-8 min-h-screen min-w-screen bg-green-200 text-gray-800">
      <h1 className="text-4xl font-ceasar font-bold text-blue-600">
        Tailwind running!
      </h1>
      <br />
      <div className="p-2">Small padding</div>
      <div className="px-8 py-4">Horizontal & Vertical Padding</div>
      <br />
      <h2 className="text-4xl font-bold text-green-600">Me very big for h2</h2>
      <br />
      <div className="bg-orange-400 p-4 border-gray-400 rounded-lg shadow-lg font-bold text-white cursor-pointer">Je suis un card</div>
      <br />
      <div className="bg-pink-200 p-4 border-orange-400 rounded-lg shadow-lg font-bold text-blue-500 cursor-pointer hover:bg-pink-300 hover:text-orange-700">Je suis un hovering card</div>
      <br />
      <div className="flex items-center justify-between bg-white p-4 rounded-lg">
        <span>Left</span>
        <span>Center</span>
        <span>Right</span>
      </div>
      <br />
      <div className="bg-blue-200 p-4 text-base md:text-xl lg:text-3xl">
        Resize me!!
      </div>
      
    </div>
  );
}
