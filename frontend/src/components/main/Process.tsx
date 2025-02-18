import React from 'react';

const Process: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">개발과정</h1>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Process steps will go here */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">1번</h2>
              <p className="text-gray-600">
                처음에 뭘 하고 다음에 뭘했다.
              </p>
            </div>
          </div>

          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">2번</h2>
              <p className="text-gray-600">
                다음에 뭘 하고 다음에 뭘했다.
              </p>
            </div>
          </div>
          {/* Add more process steps as needed */}
        </div>
      </div>
    </div>
  );
};

export default Process; 