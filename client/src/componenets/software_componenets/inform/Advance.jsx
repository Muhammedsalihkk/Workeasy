import React from 'react'
import { useNavigate } from 'react-router-dom'

function Advance() {
    const navigate=useNavigate('')
  return (
    <>
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
    <a href="/" className="text-blue-600 hover:underline flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
    </a>

    <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Efficient Task Management for Your Team
    </h1>
    <p className="text-lg text-gray-700 mb-8">
        Organize, prioritize, and track all your team's tasks in one place with our intuitive and straightforward interface.
    </p>

    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-blue-500 mr-2 text-2xl">📌</span> Centralized Dashboard
            </h2>
            <p className="text-base text-gray-600">
                Access all tasks, projects, and team activity from a single, clean interface, giving you a clear overview.
            </p>
        </div>

        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-green-500 mr-2 text-2xl">✅</span> Smart Prioritization
            </h2>
            <p className="text-base text-gray-600">
                Easily set task importance, due dates, and dependencies to keep your team aligned and focused on key objectives.
            </p>
        </div>

        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-500 mr-2 text-2xl">👥</span> Simple Team Collaboration
            </h2>
            <p className="text-base text-gray-600">
                Assign tasks, add comments, and track progress in real-time, ensuring everyone stays on the same page.
            </p>
        </div>

        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-red-500 mr-2 text-2xl">🔔</span> Clear Notifications
            </h2>
            <p className="text-base text-gray-600">
                Stay up-to-date with essential alerts on important changes or approaching deadlines, so nothing is missed.
            </p>
        </div>
    </div>

    <div className="mt-8 text-center">
        <button onClick={() => navigate('/registration')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200">
            Get Started Today
        </button>
    </div>
</div>
    </>

  )
}

export default Advance