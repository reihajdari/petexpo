import { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import { GlobalContext } from "../../App";

function AboutUsContent() {
  const { theme } = useContext(GlobalContext);

  const textColor = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div className="grid gap-6 min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <div className={`text-center ${textColor}`}>
        <h2 className="text-4xl font-semibold">About Us</h2>
        <p className="text-base font-light">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
          doloremque exercitationem minima quisquam. Quaerat vel non odit
          molestiae quas, neque expedita accusantium molestias explicabo dolores
          ducimus modi consequuntur sed id.
        </p>
        <div className="flex flex-col items-center">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/best-guard-dogs-1650302456.jpeg?crop=0.754xw:1.00xh;0.0651xw,0&resize=1200:*"
            alt=""
            className="w-full rounded-lg shadow-lg object-cover"
            style={{ maxHeight: "400px", maxWidth: "400px" }}
          />
        </div>
      </div>
      <div className={`text-center ${textColor}`}>
        <h2 className="text-4xl font-semibold">Contact Us</h2>
        <p className="text-base font-light">
          Phone Number: +355 69 264 0063
          <br />
          Email:{" "}
          <a href="mailto:reihajdari03@gmail.com" className="text-blue-500">
            reihajdari03@gmail.com
          </a>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <SocialIcon url="https://github.com/reihajdari" target="blank" />
          <SocialIcon
            url="https://www.linkedin.com/in/rei-hajdari-74a9bab8/"
            target="blank"
          />
          <SocialIcon
            url="https://www.instagram.com/rei__hajdari/?hl=af"
            target="blank"
          />
          <SocialIcon
            url="https://www.facebook.com/rei.hajdari.5"
            target="blank"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsContent;
