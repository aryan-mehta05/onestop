import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

import { FaPlay } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdEventRepeat } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

import TitleText from "../components/TitleText";

const AdvertisementSection = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };
  
  const carouselItems = [
    {
      title: "Travel.",
      name: 'Phuket',
      videoSrc: '/assets/videos/phuket.mp4',
      description: 'Escape to Phuket: Stunning beaches, vibrant nightlife, rich culture, and unforgettable adventures. Your dream vacation awaits in paradise!',
    },
    {
      title: "Explore.",
      name: 'Paris',
      videoSrc: '/assets/videos/paris.mp4',
      description: 'Experience the romance of Paris: Iconic Eiffel Tower, charming cafes, stunning art, and timeless beauty. Mark your calendars!',
    },
    {
      title: "Share.",
      name: 'New York',
      videoSrc: '/assets/videos/new-york.mp4',
      description: 'Discover the energy of New York City: Dazzling lights, Broadway shows, iconic landmarks, and endless excitement. The city never sleeps!',
    },
    {
      title: "Repeat.",
      name: 'Tokyo',
      videoSrc: '/assets/videos/tokyo.mp4',
      description: "Immerse in Tokyo's wonder: Neon lights, ancient temples, cutting-edge technology, and mouthwatering cuisine. Tradition and modernity in harmony!",
    },
  ];

  const [[currentItemIndex, direction], setCurrentItem] = useState([0, 0]);

  const handleNext = useCallback(() => {
    setCurrentItem(([prevIndex]) => [
      (prevIndex + 1) % carouselItems.length,
      1, // Direction: 1 for next
    ]);
  }, [carouselItems.length]);
  
  // Automatic rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7500);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handleCarouselButtonClick = (index: number) => {
    if (index === currentItemIndex) return;
    const newDirection = index > currentItemIndex ? 1 : -1;
    setCurrentItem([index, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
    }),
  };

  const currentItem = carouselItems[currentItemIndex];

  const iconProvider = () => {
    switch (currentItem.name) {
      case "Phuket":
        return <FaMapLocationDot className="w-12 h-12 text-os-yellow" />;
      case "Paris":
        return <FaMagnifyingGlassLocation className="w-12 h-12 text-os-yellow" />;
      case "New York":
        return <FaShareFromSquare className="w-12 h-12 text-os-yellow" />;
      case "Tokyo":
        return <MdEventRepeat className="w-12 h-12 text-os-yellow" />;
      default:
        return null;
    };
  };

  return (
    <div className="w-3/12 flex items-center justify-center relative overflow-hidden">
      {/* Animated Content */}
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentItemIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {/* Video Background */}
          <video
            src={currentItem.videoSrc}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          ></video>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-between h-full text-white w-full">
            <div className="flex gap-2 p-8">
              {iconProvider()}
              <h1 className="text-5xl font-bold mb-4">{currentItem.title}</h1>
            </div>
            <div className="bg-gradient-to-b from-transparent to-gray-900 p-8">
              <button className="bg-os-red rounded-full p-4 mb-2">
                <FaPlay className="w-4 h-4 text-white" />
              </button>
              <TitleText text={currentItem.name} className="font-bold mb-4" />
              <p className="text-lg mb-12 text-os-lightblue font-serif">
                {currentItem.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Static Elements */}
      <div className="absolute bottom-8 z-20 w-full">
        <div className="flex items-center justify-between px-8">
          <button className="group flex items-center" onClick={handleSignIn}>
            <p className="tracking-wide text-xl font-bold mr-2 cursor-pointer text-white">
              EXPLORE NOW
            </p>
            <div className="p-2 bg-gray-500/50 rounded-full group-hover:bg-gray-500/100 transition">
              <FaArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Carousel Buttons */}
          <div className="flex space-x-2">
            {carouselItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCarouselButtonClick(index)}
                className={`w-3 h-3 rounded-full ${
                  currentItemIndex === index ? "bg-white" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
