import { getAllPosts } from "./client";
import { useEffect, useRef, useState } from "react";
import FeedSummaryCard from "./FeedSummaryCard";

const FeedSummary = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const fetchAllPosts = async () => {
    const posts = await getAllPosts();

    return posts;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchAllPosts();

      setPosts(posts);
    };

    fetchPosts();
  }, []);

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
          {posts.map((post) => (
            <FeedSummaryCard
              key={post.id}
              id={post.id}
              image={post.photo}
              postedByUser={post.poster}
              description={post.caption}
              views={post.views}
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
