import React from 'react'
import { useNavigate } from 'react-router-dom'


function Teamcollabration() {
    const navigate=useNavigate('')
  return (
 <div class="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
    <a href="/" class="text-blue-600 hover:underline flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Back to Dashboard
    </a>

    <h1 class="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        Streamline Production: Collaborate Flawlessly, Deliver On Time
    </h1>
    <p class="text-xl text-gray-700 mb-8">
        In the fast-paced world of production, every second counts. Our SaaS platform delivers **real-time collaboration features** designed specifically for production teams, ensuring seamless coordination, efficient asset management, and on-schedule project delivery from pre-production to post.
    </p>

    <div class="space-y-10">
        <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <span class="text-purple-600 mr-3">🎬</span> Your Centralized Production Hub
            </h2>
            <p class="text-lg text-gray-700 mb-6">
                Say goodbye to scattered files and communication breakdowns. Our tools centralize every aspect of your production workflow, keeping your team connected and focused on bringing projects to life.
            </p>
            <div class="grid md:grid-cols-2 gap-6 text-gray-700">
                <div class="flex items-start">
                    <span class="text-green-500 text-2xl mr-3">🚀</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Real-time Project Briefing</h3>
                        <p>Instantly share updates, revise scripts, and communicate changes across departments—from concept to final cut.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-orange-500 text-2xl mr-3">🗂️</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Integrated Asset Management</h3>
                        <p>Securely upload, preview, and manage all production assets in one place. Ensure everyone has access to the latest files, from raw footage to final renders.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-blue-500 text-2xl mr-3">📊</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Transparent Production Timelines</h3>
                        <p>Track progress on every task and scene. See who's working on what, and monitor project milestones at a glance to stay on schedule.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-red-500 text-2xl mr-3">💬</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Contextual Review & Approval</h3>
                        <p>Provide precise feedback directly on media files. Streamline review cycles and get approvals faster to keep production moving.</p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <span class="text-teal-600 mr-3"> crew</span> Empowering Your Production Crew
            </h2>
            <p class="text-lg text-gray-700 mb-6">
                From pre-production planning to post-production polish, our features are purpose-built to enhance every collaborative step for your crew:
            </p>
            <div class="grid md:grid-cols-2 gap-6 text-gray-700">
                <div class="flex items-start">
                    <span class="text-indigo-500 text-2xl mr-3">✅</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Role-Based Task Management</h3>
                        <p>Assign tasks to specific roles or individuals (e.g., editor, sound engineer, director) and track their progress towards project completion.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-yellow-500 text-2xl mr-3">📤</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Secure Media Sharing & Versioning</h3>
                        <p>Safely share large video files, audio tracks, and graphics. Maintain a clear history of all versions, preventing costly errors and rework.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-pink-500 text-2xl mr-3">🗓️</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Integrated Production Calendars</h3>
                        <p>Coordinate shooting schedules, edit deadlines, and delivery dates with shared calendars, minimizing conflicts and maximizing on-set efficiency.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <span class="text-cyan-500 text-2xl mr-3">📡</span>
                    <div>
                        <h3 class="font-semibold text-xl mb-1">Cross-Departmental Communication</h3>
                        <p>Create dedicated channels for directors, producers, editors, and VFX artists, ensuring all relevant stakeholders are always in sync.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <p class="text-lg text-gray-700 mt-10 text-center">
        By centralizing communication and production workflows, our SaaS platform empowers your team to work smarter, not harder, leading to faster turnaround times, superior creative output, and a more profitable production pipeline.
    </p>

    <div  onClick={()=>navigate('/registration')} class="mt-10 text-center">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Get Strat Today
        </button>
    </div>
</div>
  )
}

export default Teamcollabration