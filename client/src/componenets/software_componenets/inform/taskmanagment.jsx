import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Taskmanagment() {
      const [showDetails, setShowDetails] = useState(false);
      const navigate=useNavigate('')

  return (
     <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
    <Link to="/" className="text-blue-600 hover:underline"> Back to Home</Link>

    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 mt-6 leading-tight">Master Your Team's Workflow with Intuitive Task Management</h1>
    <p className="text-xl text-gray-700 mb-8">
        Say goodbye to scattered tasks and missed deadlines. Our platform empowers your team to organize, prioritize, and track every single task effortlessly, all in one centralized hub.
    </p>

    <div className="space-y-8 text-gray-800">
        <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
                <span className="text-blue-600 mr-3">🚀</span> Centralized Command Center
            </h2>
            <p className="text-lg">Gain a complete overview of all tasks, projects, and team activities from one intuitive, beautifully designed dashboard. No more searching, just pure productivity.</p>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
                <span className="text-green-600 mr-3">🎯</span> Intelligent Prioritization
            </h2>
            <p className="text-lg">Effortlessly define task importance, set realistic due dates, and map out dependencies to ensure your team is always aligned and focused on what matters most.</p>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
                <span className="text-purple-600 mr-3">🤝</span> Seamless Team Collaboration
            </h2>
            <p className="text-lg">Boost teamwork by easily assigning tasks, sharing crucial comments, and monitoring real-time progress. Everyone stays on the same page, every step of the way.</p>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
                <span className="text-red-600 mr-3">🔔</span> Instant Notifications, Zero Worries
            </h2>
            <p className="text-lg">Stay in the loop with immediate alerts on critical updates, approaching deadlines, or any significant changes. Never miss a beat, and keep projects moving forward smoothly.</p>
        </div>
    </div>

    <div className="mt-10 text-center">
        <button onClick={()=>navigate('/registration')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Get Started Today
        </button>
    </div>
</div>
  )
}

export default Taskmanagment