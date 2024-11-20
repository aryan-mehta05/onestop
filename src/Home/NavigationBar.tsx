import { TbLocationHeart } from "react-icons/tb";
import { IoArrowForwardOutline } from "react-icons/io5";

// import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const isSignedIn = true;
  const username = "Aryan";
  // const navigate = useNavigate();

  const navButtons = [
    {
      id: 1,
      title: "About",
      link: "/about",
    }, {
      id: 2,
      title: "Team",
      link: "/team",
    }, {
      id: 3,
      title: "Pricing",
      link: "/pricing",
    }, {
      id: 4,
      title: "Contact Us",
      link: "/contact-us",
    }
  ];
  
  return (
    <div className="flex items-center justify-between bg-os-blue px-12 py-4">
      <div className="flex items-center justify-center font-playfair font-semibold">
        <TbLocationHeart className="w-8 h-8 text-os-yellow mr-2" />
        <h3 className="text-3xl text-white font-light">One<span className="font-bold">Stop</span></h3>
      </div>

      {isSignedIn && (
        <div className="flex items-center justify-center gap-x-6">
          {navButtons.map((button) => (
            <button
              key={button.id}
              className="text-sm text-gray-200 tracking-wider hover:text-white uppercase font-light"
              // onClick={() => navigate(button.link)}
            >
              {button.title}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-x-4">
        {isSignedIn ? (
          <>
            <p className="font-bold tracking-wide text-white">
              Welcome, {username}!
            </p>
            <button className="bg-os-red flex items-center gap-x-2 text-white px-3 py-2 rounded-md">
              Go to your feed
              <IoArrowForwardOutline className="w-4 h-4" />
            </button>
          </>

        ) : (
          <>
            <button className="bg-os-red border border-os-red text-white px-3 py-2 rounded-md hover:scale-110 transition-transform">
              Sign In
            </button>
            <button className="bg-white border border-os-red text-os-red px-3 py-2 rounded-md hover:scale-110 transition-transform">
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
