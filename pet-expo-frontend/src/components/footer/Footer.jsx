import { Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { theme } = useContext(GlobalContext);

  const navigate = useNavigate();

  const footerStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  const textStyle = {
    color: theme === "dark" ? "#fff" : "#000",
    cursor: "pointer",
  };

  const date = new Date();

  return (
    <footer style={footerStyle} className="w-full p-8 ">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="logo-ct"
          className="w-10"
        />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              onClick={() => navigate("/aboutus")}
              as="a"
              color="blue-gray"
              style={textStyle}
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              onClick={() => navigate("/contactus")}
              color="blue-gray"
              style={textStyle}
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography
        color="blue-gray"
        style={textStyle}
        className="text-center font-normal"
      >
        {date.getFullYear()} Rei Hajdari
      </Typography>
    </footer>
  );
}

export default Footer;
