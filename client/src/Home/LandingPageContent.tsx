import FeedSummary from "./FeedSummary";
import NavigationBar from "./NavigationBar";
import TypewriterText from "./TypewriterText";
import SearchBar from "../components/SearchBar";

const LandingPageContent = () => {
  return (
    <div className="w-9/12">
      <NavigationBar />
      <TypewriterText />
      <SearchBar />
      <FeedSummary />
    </div>
  );
};

export default LandingPageContent;
