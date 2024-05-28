import { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";
import { Navbar, Typography, Button, Input } from "@material-tailwind/react";
import { getAllPets } from "../../api/data";
import { PetContext } from "../../screens/AdminPage";

function AdminHeader() {
  const { theme, setTheme } = useContext(GlobalContext);
  const { searchTerm, setSearchTerm } = useContext(PetContext);

  const handleSearch = async () => {
    try {
      const results = await getAllPets(searchTerm);
      setSearchTerm(results);
      
    } catch (error) {
      console.error("Failed to search pets", error);
    }
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
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Type here..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
