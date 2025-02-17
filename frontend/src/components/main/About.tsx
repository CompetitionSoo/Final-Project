import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">제품소개</h1>
        
        <div className="prose lg:prose-xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">이건</h2>
            <p className="text-gray-600">
              뭐냐.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">이건</h2>
            <p className="text-gray-600">
              이거다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">우리는</h3>
              <p className="text-gray-600">
                땡땡땡.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">그래서</h3>
              <p className="text-gray-600">
                저쩌고.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 