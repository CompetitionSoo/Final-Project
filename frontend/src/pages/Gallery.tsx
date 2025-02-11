import React from 'react';

const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">프로젝트 갤러리</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gallery items will go here */}
        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-300 hover:opacity-75 transition-opacity duration-300">
            {/* Image placeholder */}
          </div>
        </div>
        {/* Add more gallery items as needed */}
      </div>
    </div>
  );
};

export default Gallery; 