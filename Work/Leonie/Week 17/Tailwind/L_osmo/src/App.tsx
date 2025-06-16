import { useState } from 'react'
import './App.css'

export default function App() {

  return (
    <>
        <header className="bg-blue-600 p-4">
            <nav className="flex items-center justify-between">
                <div className="text-white font-bold">Logo</div>
                <div className="flex space-x-6">
                    <a href="#" className="text-white hover:text-blue-200">Home</a>
                    <a href="#" className="text-white hover:text-blue-200">Menu</a>
                    <a href="#" className="text-white hover:text-blue-200">News</a>
                </div>
            </nav>
        </header>
    </>
  )
}
