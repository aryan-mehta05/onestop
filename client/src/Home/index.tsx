import LandingPageContent from "./LandingPageContent";
import AdvertisementSection from "./AdvertisementSection";

const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <AdvertisementSection />
      <LandingPageContent />
    </div>
  );
};

export default Home;
