import React, { useEffect, useState } from 'react';
import TestimonialCard from '../pages/testimonials/TestimonialCard';
import TestimonialService from '../services/testimonial.service';
import ImageService from '../services/image.service';
import ProjectService from '../services/project.service';
import ProjectCard from '../pages/projects/ProjectCard';
import { Carousel } from 'react-responsive-carousel';

import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <section className="h-screen  bg-gradient-to-b from-green-100 to-blue-100 text-black flex justify-center items-center relative overflow-x-hidden">
      <div className="absolute bg-gradient-to-b from-red-100 to-blue-200 shadow-md mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-full text-center md:text-left md:pr-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Explore Our Website
          </h2>
          <Link to="/contactUs">
            <button className="relative bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 text-base md:text-lg lg:text-xl hover:from-green-600 hover:to-green-400 transition-transform duration-500 ease-in-out hover:-translate-y-2 overflow-hidden group">
              <span className="relative z-10">Feel Free to Ask</span>
              <span className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-green-200 via-green-300 to-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>
            </button>
          </Link>
        </div>
        <div className="md:w-full text-center relative">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <img
              src="/circle.png"
              alt="Circle Logo"
              className="absolute  w-1/3 md:w-1/4 lg:w-1/6 h-auto object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4"
            />
            <img
              src="/banner.png"
              alt="Company Logo"
              className="object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4 mt-4 md:mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const WelcomeSectionSkeleton = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-green-100 to-blue-100 text-black flex justify-center items-center relative overflow-x-hidden">
      <div className="absolute bg-gradient-to-b from-red-100 to-blue-200 shadow-md mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-full text-center md:text-left md:pr-8">
          <div className="animate-pulse text-2xl md:text-3xl lg:text-4xl font-bold mb-4 h-10 w-60 bg-gray-300 rounded-full mb-4"></div>
          <div className="animate-pulse h-12 w-44 bg-gray-300"></div>
        </div>
        <div className="md:w-full text-center relative">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <div className="animate-pulse absolute w-1/3 md:w-1/4 lg:w-1/6 h-auto object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4"></div>
            <div className="animate-pulse object-cover object-center transform scale-x-[-1] transition-transform duration-500 ease-in-out hover:-translate-y-4 mt-4 md:mt-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};


// The rest of your code remains the same




const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="flex items-start">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mr-4"></div>
        <div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
              <span className="bg-gray-300 h-8 w-8 animate-pulse rounded-full"></span>
            </div>
          </div>
          <div className="bg-gray-300 h-6 w-1/2 mx-auto animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      TestimonialService.getAllTestimonials(),
      ProjectService.getAllProjects(),
      ImageService.getAllImages(),
    ])
      .then(([testimonials, projects, imageData]) => {
        setAllTestimonials(testimonials);
        setAllProjects(projects);
        setImages(imageData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getRandomTestimonials = (testimonials, startIndex, count) => {
    return testimonials.slice(startIndex, startIndex + count);
  };

  const testimonialsPerPage = 2; // Number of testimonials to display per page
  const totalPages = Math.ceil(allTestimonials.length / testimonialsPerPage);

  const handleNextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const randomTestimonials = getRandomTestimonials(
    allTestimonials,
    currentIndex * testimonialsPerPage,
    testimonialsPerPage
  );
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      {loading ? (
        <WelcomeSectionSkeleton />
      ) : (
        <WelcomeSection />
      )}
       <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-300">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Our Projects</h2>
    {loading ? (
      Array(3).fill().map((_, index) => <SkeletonCard key={index} />)
    ) : (
      <Carousel
        showArrows={true} // Show navigation arrows
        autoPlay={true} // Enable auto-play
        interval={5000} // Set auto-play interval (in milliseconds)
        infiniteLoop={true} // Enable infinite loop
        stopOnHover={false} // Disable auto-play on hover
      >
        {allProjects.map((project) => {
          const matchingImage = images.find((image) => image.s3Key === project.project_image);
          return (
            <ProjectCard key={project._id} project={project} image={matchingImage} />
          );
        })}
      </Carousel>
    )}
  </div>
</section>
       {/* Testimonials Section */}
       <section className="py-16 bg-gradient-to-b from-blue-300 to-grey-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8  text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {loading ? (
              Array(3).fill().map((_, index) => <SkeletonCard key={index} />)
            ) : (
              randomTestimonials.map((testimonial) => {
                const matchingImage = images.find((image) => image.s3Key === testimonial.test_image);
                return (
                  <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    image={matchingImage}
                  />
                );
              })
            )}
          </div>
          <div className='text-right'> {totalPages > 1 && (
            <button onClick={handleNextPage}>Next</button>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
     
   