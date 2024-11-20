import React, { useRef } from "react";
import FeedSummaryCard from "./FeedSummaryCard";

const FeedSummary = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const cardContent = [
    {
      id: 1,
      image: "/assets/images/netherlands-adam.jpg",
      postedByUser: "Adam Smith",
      postedByUserImage: "/assets/images/adam.jpg",
      type: "Creators",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente amet assumenda commodi cumque quibusdam quasi vitae magnam quam ad sunt!",
      views: 7429801,
    },
    {
      id: 2,
      image: "/assets/images/jakarta-naomi.jpg",
      postedByUser: "Naomi Baker",
      postedByUserImage: "/assets/images/naomi.jpg",
      type: "Creators",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, animi. Explicabo, dolorum!",
      views: 5790682,
    },
    {
      id: 3,
      image: "/assets/images/bali-beach.jpg",
      postedByUser: "Jason John",
      postedByUserImage: "/assets/images/jason.jpg",
      type: "Places",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure placeat veniam illo ex modi accusamus similique labore quae ea.",
      views: 3768923481,
    },
    {
      id: 4,
      image: "/assets/images/switzerland-mountains.png",
      postedByUser: "Vlad Petrov",
      postedByUserImage: "/assets/images/vlad.jpg",
      type: "Places",
      description: "Lorem ipsum dolor sit amet...",
      views: 13561,
    },
    {
      id: 5,
      image: "/assets/images/tulum-beach.jpg",
      postedByUser: "Camila Mendez",
      postedByUserImage: "/assets/images/camila.jpg",
      type: "Places",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga incidunt nisi quidem distinctio.",
      views: 436702,
    },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth; // Scroll by the width of the container
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-12 mt-10 relative">
      <h4 className="font-semibold font-playfair text-2xl italic text-gray-700 mb-8">
        Explore what's trending...
      </h4>

      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 p-3 rounded-full border border-white hover:text-gray-700 hover:border-gray-400 hover:shadow-md"
          onClick={() => scrollCarousel("left")}
        >
          {"<"}
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex items-center gap-x-6 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cardContent.map((card) => (
            <FeedSummaryCard
              key={card.id}
              id={card.id}
              image={card.image}
              postedByUser={card.postedByUser}
              postedByUserImage={card.postedByUserImage}
              type={card.type}
              description={card.description}
              views={card.views}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 p-3 rounded-full border border-white hover:text-gray-700 hover:border-gray-400 hover:shadow-md"
          onClick={() => scrollCarousel("right")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default FeedSummary;
