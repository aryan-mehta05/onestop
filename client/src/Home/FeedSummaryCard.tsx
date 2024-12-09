import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { TbThumbUp } from "react-icons/tb";
import { likePost, viewPost } from "./client";
// import { FiSend } from "react-icons/fi";
// import { FaHeart } from "react-icons/fa6";
// import { FaRegHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
// import { HiDotsVertical } from "react-icons/hi";

interface FeedSummaryCardProps {
  id: string;
  image: Buffer | any;
  postedByUser: string;
  description: string;
  views: number;
  likes: number;
};

const FeedSummaryCard = ({
  id,
  image,
  postedByUser,
  description,
  views,
  likes,
}: FeedSummaryCardProps) => {
  // const [isLiked, setIsLiked] = useState<boolean>(false);
  const isSignedIn = false;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const imageData = "data:image/png;base64," + String.fromCharCode(...image.data);
  const navigate = useNavigate();

  function format(views: number): string {
    if (views >= 1_000_000_000) {
      return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      return views.toString();
    }
  };

  return (
    <div
      className="relative flex-shrink-0 w-[300px] h-[400px] border border-gray-200 rounded-lg shadow-md overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Image */}
      <img
        src={imageData}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative w-full h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="m-2 flex items-center justify-between">
            {/* Top card content */}
            <button className="flex items-center">
              <p className="text-xs bg-white pl-2 pr-5 rounded-full">{postedByUser}</p>
            </button>
          </div>
          <div className="backdrop-blur-[2px]">
            {/* Bottom card content */}
            {/* <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex items-center gap-x-2">
                {isLiked ? (
                  <button onClick={() => setIsLiked(!isLiked)}>
                    <FaHeart className="w-4 h-4 text-os-red" />
                  </button>
                ) : (
                  <button onClick={() => setIsLiked(!isLiked)}>
                    <FaRegHeart className="w-4 h-4 text-white" />
                  </button>
                )}
                <FaRegComment className="w-4 h-4 text-white" />
                <FiSend className="w-4 h-4 text-white" />
              </div>
              <HiDotsVertical className="w-4 h-4 text-white" />
            </div>
            <div className="text-white font-semibold px-2 mb-2">
              {description}
            </div> */}
            <div className="bg-os-darkblue px-2 py-1 flex items-center justify-between">
              <div className="text-white flex items-center">
                <IoIosEye className="w-4 h-4 mr-1" />
                <p className="text-xs">{format(views)} views</p>
                <span className="text-md text-gray-300 ml-2">|</span>
                <TbThumbUp className="w-4 h-4 mr-1" />
                <p className="text-xs">{format(likes)} likes</p>
                <span className="text-md text-gray-300 ml-2">|</span>
              </div>
              <div>
                <button
                  className={`px-3 font-semibold rounded-md text-black bg-os-sky hover:bg-os-lightblue}`}
                  onClick={() => {
                    if (!isSignedIn) {
                      navigate('/signin');
                      return;
                    }

                    likePost(id);

                    likes += 1;
                  }}
                >
                  {"Like"}
                </button>
                {" "}
                <button
                  className={`px-3 font-semibold rounded-md text-black ${isFollowing ? "bg-os-yellow hover:bg-os-orange" : "bg-os-sky hover:bg-os-lightblue"}`}
                  onClick={() => {
                    if (!isSignedIn) {
                      navigate('/signin');
                      return;
                    }

                    setIsFollowing(!isFollowing)
                  }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSummaryCard;
