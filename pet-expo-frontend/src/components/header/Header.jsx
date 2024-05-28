import { Navbar, Typography, Button, Input } from "@material-tailwind/react";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Header() {
  const { theme, setTheme, searchTerm, setSearchTerm } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const headerStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  const buttonColor = () => (theme === "dark" ? "white" : "black");
  const color = buttonColor();

  return (
    <div style={headerStyle}>
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white w-full">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Pet-Expo
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <Button
              className="rounded-full"
              color={color}
              onClick={handleThemeToggle}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>

            <Button
              className="rounded-full"
              color={color}
              onClick={() => navigate("/adminpage")}
            >
              Admin
            </Button>
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Type here..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
