import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import about from '../assets/about.jpg';

const caseStudiesPage1 = [
  { id: 1, title: 'Brilliant Sound, Everywhere', client: 'Sonos', category: 'Audio', year: 2024, imageUrl: about },
  { id: 2, title: 'Free to Be King', client: 'Budweiser', category: 'FMCG', year: 2024, imageUrl: about },
  { id: 3, title: 'Transforming Customer Experience', client: 'Elgiganten Sweden', category: 'Ecommerce', year: 2024, imageUrl: about },
  { id: 4, title: 'Launch of the Beyond Meat Burger', client: 'A&W', category: 'FMCG', year: 2024, imageUrl: about },
  { id: 5, title: 'Giving Gamers the Power to Skip a Shower', client: 'Mitchum', category: 'FMCG', year: 2024, imageUrl: about },
  { id: 6, title: 'Full Funnel SEO Strategy', client: 'Dubai Properties', category: 'Real-Estate', year: 2024, imageUrl: about },
];

const caseStudiesPage2 = [
  { id: 7, title: 'Another Case Study 1', client: 'Client A', category: 'Tech', year: 2024, imageUrl: about },
  { id: 8, title: 'Another Case Study 2', client: 'Client B', category: 'Retail', year: 2024, imageUrl: about },
  { id: 9, title: 'Another Case Study 3', client: 'Client C', category: 'Automotive', year: 2024, imageUrl: about },
];

const allPagesData = {
  1: caseStudiesPage1,
  2: caseStudiesPage2,
};

function Work() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/work?page=${page}`);
  };

  const caseStudies = allPagesData[currentPage] || [];

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      <div className="container mx-auto text-center">
        {/* Adjusted spacing and line height for the heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 lg:mb-8 leading-none">
          <span className="text-white">END-TO-END</span> <br />
          <span className="text-green-500">EXCELLENCE</span>
        </h1>
        {/* Centered the paragraph text and adjusted max-width */}
        <p className="max-w-2xl text-lg mx-auto mb-20 text-center">
          We are designed to deliver growth across the entire media spectrum, adapting rapidly to consumer behaviour through a performance mindset.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group cursor-pointer rounded-lg overflow-hidden relative"
              style={{ paddingBottom: '75%', position: 'relative' }}
            >
              <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105">
                <img
                  src={study.imageUrl}
                  alt={`${study.client} case study`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{study.title}</h2>
                  <p className="text-base text-gray-300">{study.client}</p>
                  <p className="text-sm text-gray-400 mt-4">{study.category}</p>
                  <span className="absolute bottom-0 right-0 text-sm text-gray-400">{study.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-16 space-x-4">
          <button
            onClick={() => handlePageChange(1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              currentPage === 1 ? 'bg-green-500 text-black' : 'bg-gray-700 text-white hover:bg-green-500 hover:text-black'
            }`}
          >
            1
          </button>
          <button
            onClick={() => handlePageChange(2)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              currentPage === 2 ? 'bg-green-500 text-black' : 'bg-gray-700 text-white hover:bg-green-500 hover:text-black'
            }`}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
}

export default Work;