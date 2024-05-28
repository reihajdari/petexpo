import ContactUsHeader from "../components/contactUs/ContactUsHeader";
import ContactUsContent from "../components/contactUs/ContactUsContent";
import { useContext } from "react";
import { GlobalContext } from "../App";

function ContactUs() {
  const { theme } = useContext(GlobalContext);

  const pageStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div style={pageStyle}>
      <ContactUsHeader />
      <ContactUsContent />
    </div>
  );
}

export default ContactUs;
