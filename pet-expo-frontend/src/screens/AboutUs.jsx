import { useContext } from "react";
import { GlobalContext } from "../App";
import AboutUsHeader from "../components/aboutUs/AboutUsHeader";
import AboutUsContent from "../components/aboutUs/AboutUsContent";

function AboutUs() {
  const { theme } = useContext(GlobalContext);

  const pageStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div style={pageStyle}>
      <AboutUsHeader />
      <AboutUsContent />
    </div>
  );
}

export default AboutUs;
