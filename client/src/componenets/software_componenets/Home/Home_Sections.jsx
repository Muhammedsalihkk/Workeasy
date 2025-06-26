import React from 'react'
import { Workflow, BarChart, Headphones,CheckSquare,Users,BarChart4,Link2 } from "lucide-react";
import CountUp from "react-countup";
import { useNavigate } from 'react-router-dom';
function Home_Sections() {

  const navigate=useNavigate('')
  return (
    <div>
        <div className="scroll-smooth min-h-screen flex flex-col bg-gray-50">

  {/* NAVBAR - Enhanced with better spacing and subtle animation */}


  {/* HERO SECTION - More polished with gradient and better spacing */}
  <section
    id="home"
    className="pt-32 md:pt-40 pb-24 px-6 bg-gradient-to-br from-blue-50 to-white"
  >
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      {/* TEXT CONTENT - Better typography */}
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Simplify Your Workflow</span><br />
          with Modern SaaS Solution
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
          All-in-one platform to help your team plan, track, and deliver results faster than ever before. Join thousands of satisfied customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button onClick={()=>navigate('/registration')} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1">
            Get Started 
          </button>
         
        </div>
        <div className="mt-8 flex items-center justify-center md:justify-start space-x-2 text-gray-500">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((item) => (
              <img
                key={item}
                src={`https://i.pravatar.cc/100?img=${item + 10}`}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <span className="text-sm">Trusted by 10,000+ teams worldwide</span>
        </div>
      </div>

      {/* IMAGE SECTION - Better shadow and border */}
      <div className="relative w-full md:w-1/2">
        <div className="relative overflow-hidden rounded-xl shadow-2xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Dashboard Preview"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-blue-500/5"></div>
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-lg hidden md:block">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Daily active users</p>
              <p className="font-bold text-gray-800">+42.7%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* LOGOS SECTION - Better animation and layout */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6 ">
    <p className="text-center text-gray-500 mb-12 text-sm uppercase tracking-wider font-medium">
      Trusted by India's Top Food Brands
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center text-center">

      {/* Amul */}
      <div>
        <img
          src="https://i0.wp.com/sarajevotimes.com/wp-content/uploads/2015/10/Bingo-in-Tus-Stores-bingotuzla.ba_.jpg?resize=860%2C573&ssl=1"
          alt="Amul"
          className="h-24 w-full object-contain rounded-xl shadow-md bg-white p-2 mb-4"
        />
        <p className="text-base font-semibold text-gray-800">Bingo</p>
      </div>

      {/* Britannia */}
      <div>
        <img
          src="https://www.taxscan.in/wp-content/uploads/2024/12/GST-Goods-and-Service-Tax-Calcutta-High-Court-GST-Fraud-cases-TAXSCAN.jpg"
          alt="Britannia"
          className="h-24 w-full object-contain rounded-xl shadow-md bg-white p-2 mb-4"
        />
        <p className="text-base font-semibold text-gray-800">Britannia</p>
      </div>

      {/* Haldiram's */}
      <div>
        <img
          src="https://www.latestlaws.com/media/2023/04/haldiram-0-1680606947.jpeg"
          alt="Haldiram's"
          className="h-24 w-full object-contain rounded-xl shadow-md bg-white p-2 mb-4"
        />
        <p className="text-base font-semibold text-gray-800">Haldiram's</p>
      </div>

      {/* ITC Foods */}
      <div>
        <img
          src="https://thebrandhopper.com/wp-content/uploads/2023/07/itc-limited.jpg"
          alt="ITC Foods"
          className="h-24 w-full object-contain rounded-xl shadow-md bg-white p-2 mb-4"
        />
        <p className="text-base font-semibold text-gray-800">ITC Foods</p>
      </div>

    </div>
  </div>
</section>



  {/* FEATURES SECTION - More visual hierarchy */}
  <section id="features" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">Features</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Powerful features designed to help you and your team work more efficiently and effectively.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Task Management</h3>
          <p className="text-gray-600 mb-4">Organize, prioritize, and track all your team's tasks in one place with our intuitive interface.</p>
          <div  onClick={()=>navigate('/taskmanagment')} href="#" className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-200">
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
          <p className="text-gray-600 mb-4">Real-time collaboration features that keep your team aligned and productive, no matter where they are.</p>
          <p onClick={()=>navigate('/Teamcollabration')} className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-200">
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
          <p className="text-gray-600 mb-4">Get actionable insights with our powerful analytics dashboard that tracks all your key metrics.</p>
          <p onClick={()=>navigate('/Analytics')} className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-200">
            Learn more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* PRODUCT SHOWCASE - More engaging */}
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
            <img
              src="https://www.sas.com/en_in/solutions/cloud/resources/_jcr_content/socialShareImage.img.c359145b65634464ca451e86295dadf3.png"
              alt="Product Feature"
              className="rounded-2xl shadow-xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">Work Smarter</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Streamline your workflow with intuitive tools</h2>
          <p className="text-lg text-gray-600 mb-6">Our platform is designed to eliminate busywork so you can focus on what really matters. Automate repetitive tasks and get more done in less time.</p>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">Automated task assignment</p>
                <p className="text-gray-600">Tasks are automatically assigned based on team availability and skills.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">Real-time progress tracking</p>
                <p className="text-gray-600">See exactly where every project stands with our visual progress indicators.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">Customizable workflows</p>
                <p className="text-gray-600">Adapt the system to your team's unique processes, not the other way around.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* TESTIMONIALS - More polished */}
  <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by teams worldwide</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our customers have to say.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-sm text-gray-500">Marketing Director, TechCorp</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic">"This platform has transformed how our marketing team operates. We've seen a 40% increase in productivity since implementing it."</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>June 15, 2023</span>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Michael Chen"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900">Michael Chen</p>
              <p className="text-sm text-gray-500">CTO, StartupHub</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic">"The analytics dashboard alone is worth the price. We've made better decisions in the last quarter than in the previous year."</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>May 22, 2023</span>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Emma Rodriguez"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900">Emma Rodriguez</p>
              <p className="text-sm text-gray-500">Product Manager, DesignCo</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic">"Our design team collaboration has improved dramatically. The real-time feedback features have cut our review cycles in half."</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>April 30, 2023</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id='contact' className="py-16 bg-white border-t border-gray-200">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay updated with our newsletter</h2>
      <p className="text-gray-600 mb-8">Subscribe to receive product updates, special offers, and tips to improve your workflow.</p>
      
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
        type='email'
          placeholder="Enter Your email"
          rows={10}
          cols={10}
          className=" resize flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm"
        >
          Send
        </button>
      </form>
      
      <p className="mt-4 text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  </section>

  {/* FOOTER - More comprehensive */}

</div>
    </div>
  )
}

export default Home_Sections