
import { Home, RefreshCw, ServerCrash } from 'lucide-react';

export default function Error500() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
              <ServerCrash className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-2">500</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Internal Server Error
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Something went wrong on our end. Our team has been notified and 
              we're working to fix the issue as quickly as possible.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Error Code: <span className="font-mono text-gray-700">ERR_INTERNAL_500</span>
            </p>
            <p className="text-sm text-gray-500">
              Still having issues? <a href="#" className="text-red-600 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}