import React from 'react'

export default function Footer() {
  return (
    <div>
          <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        <div className="col-span-2">
          <div className="text-2xl font-extrabold text-white mb-4 flex items-center">
           <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png" className='w-18' alt="" />
            Workeasy
          </div>
          <p className="mb-6">The all-in-one platform to help your team plan, track, and deliver results faster than ever before.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Integrations</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Updates</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Roadmap</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Press</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Community</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Tutorials</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Webinars</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">API Docs</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">© 2023 YourSaaS. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}
