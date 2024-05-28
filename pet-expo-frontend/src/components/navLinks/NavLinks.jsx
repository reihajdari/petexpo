import { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function NavLinks() {
  const { theme, setCategory } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState("Dog");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCategory(category);
  };

  const navLinksStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div style={navLinksStyle}>
      <div className="flex w-max gap-8 justify-center mx-auto">
        <FormControl>
          <FormLabel
            className={`${textColor}`}
            id="demo-row-radio-buttons-group-label"
          >
            Select Category
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Dog"
              control={<Radio />}
              label="Dogs"
              checked={selectedCategory === "Dog"}
              onChange={handleCategoryChange}
            />
            <FormControlLabel
              value="Cat"
              control={<Radio />}
              label="Cats"
              onChange={handleCategoryChange}
            />
            <FormControlLabel
              value="Bird"
              control={<Radio />}
              label="Birds"
              onChange={handleCategoryChange}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default NavLinks;
