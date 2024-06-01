import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../App";
import { createPet } from "../../api/data";
import {
  Button,
  Dialog,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { PetContext } from "../../screens/AdminPage";

function AddPet() {
  const { theme } = useContext(GlobalContext);
  const { setAllPets } = useContext(PetContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const endRef = useRef(null);
  const [newPet, setNewPet] = useState({
    name: "",
    breed_group: "",
    size: "",
    lifespan: "",
    origin: "",
    temperament: "",
    description: "",
    image: "",
    category: "",
    colors: [""],
  });

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      const response = await createPet(newPet);
      setAllPets((prevPets) => [...prevPets, response]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add the pet", error);
      alert("Failed to add the pet. Please try again.");
    }
  };

  const handleNewPetInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({ ...prev, [name]: value }));
  };

  const addColorInput = () => {
    setNewPet((prev) => ({
      ...prev,
      colors: [...prev.colors, ""],
    }));
  };

  const removeColorInput = (index) => {
    const colors = [...newPet.colors];
    colors.splice(index, 1);
    setNewPet((prev) => ({ ...prev, colors }));
  };

  const handleColorChange = (e, index) => {
    const colors = [...newPet.colors];
    colors[index] = e.target.value;
    setNewPet((prev) => ({ ...prev, colors }));
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (isAddModalOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAddModalOpen]);

  if (!newPet) {
    return <div>Loading...</div>;
  }

  const styles = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000a",
  };

  return (
    <div style={styles} className="p-4">
      <Button color="green" onClick={() => setIsAddModalOpen(true)}>
        Add Pet
      </Button>
      <Dialog
        size="lg"
        open={isAddModalOpen}
        handler={() => setIsAddModalOpen(false)}
        className="overflow-y-auto"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <div
          className={`p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h2 className="text-2xl mb-4">Add New Pet</h2>
          <form onSubmit={handleAddPet} className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Name"
              value={newPet.name}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="text"
              name="breed_group"
              label="Breed Group"
              value={newPet.breed_group}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="text"
              name="size"
              label="Size"
              value={newPet.size}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="text"
              name="lifespan"
              label="Lifespan"
              value={newPet.lifespan}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="text"
              name="origin"
              label="Origin"
              value={newPet.origin}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="text"
              name="temperament"
              label="Temperament"
              value={newPet.temperament}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Textarea
              name="description"
              label="Description"
              value={newPet.description}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Input
              type="url"
              name="image"
              label="Image URL"
              value={newPet.image}
              onChange={handleNewPetInputChange}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <Select
              name="category"
              label="Category"
              value={newPet.category}
              onChange={(e) => setNewPet((prev) => ({ ...prev, category: e }))}
              className={`w-full ${
                theme === "dark" ? "bg-gray-700 text-white" : ""
              }`}
              required
            >
              <Option value="Dog">Dog</Option>
              <Option value="Cat">Cat</Option>
              <Option value="Bird">Bird</Option>
            </Select>
            {newPet.colors.map((color, index) => (
              <div key={index} className="space-x-2 flex items-center">
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(e, index)}
                  placeholder="Color"
                  className={`w-full ${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                  required
                />
                <Button color="red" onClick={() => removeColorInput(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button color="blue" onClick={addColorInput}>
              Add Color
            </Button>
            <div className="flex justify-end mt-4 space-x-2">
              <Button color="blue" type="submit">
                Add
              </Button>
              <Button color="red" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
            </div>
            <div ref={endRef}></div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default AddPet;
