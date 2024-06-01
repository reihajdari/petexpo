import {
  Button,
  Input,
  Textarea,
  Dialog,
  Select,
  Option,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { getAllPets, updatePet } from "../../api/data";
import { PetContext } from "../../screens/AdminPage";
import ConfirmModal from "../confirm/ConfirmModal";

function AdminContent() {
  const { theme } = useContext(GlobalContext);
  const { allPets, setAllPets, searchTerm } = useContext(PetContext);
  const [expandedPetId, setExpandedPetId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [deletePetId, setDeletePetId] = useState(null);
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const pets = await getAllPets(searchTerm);
      setAllPets(pets);
    };
    fetchPets();
  }, [searchTerm, setAllPets]);

  const handleToggleDescription = (petId) => {
    setExpandedPetId((prev) => (prev === petId ? null : petId));
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleDeletePet = (petId) => {
    setDeletePetId(petId);
  };

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setIsEditModalOpen(true);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    try {
      await updatePet(selectedPet._id, selectedPet);
      setAllPets((prevPets) =>
        prevPets.map((p) => (p._id === selectedPet._id ? selectedPet : p))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update the pet", error);
      alert("Failed to update the pet. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPet((prev) => ({
      ...prev,
      [name]:
        name === "colors"
          ? value.split(",").map((color) => color.trim())
          : value,
    }));
  };

  const handleColorInputChange = (e) => {
    setNewColor(e.target.value);
  };

  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setSelectedPet((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const handleRemoveColor = (colorIndex) => {
    setSelectedPet((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, index) => index !== colorIndex),
    }));
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const styles = {
    header: {
      backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
      color: theme === "dark" ? "#fff" : "#000a",
    },
    table: {
      backgroundColor: theme === "dark" ? "#444" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    },
    cell: {
      borderColor: theme === "dark" ? "#555" : "#ddd",
    },
    button: {
      backgroundColor: theme === "dark" ? "#666" : "#007bff",
      color: theme === "dark" ? "#fff" : "#fff",
    },
  };

  return (
    <div
      className={`p-4 min-h-[76vh] ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="overflow-x-auto">
        <table
          className={`min-w-full mt-4 ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          <thead>
            <tr>
              <th className="py-2" style={styles.header}>
                Name
              </th>
              <th className="py-2" style={styles.header}>
                Breed Group
              </th>
              <th className="py-2" style={styles.header}>
                Size
              </th>
              <th className="py-2" style={styles.header}>
                Lifespan
              </th>
              <th className="py-2" style={styles.header}>
                Origin
              </th>
              <th className="py-2" style={styles.header}>
                Temperament
              </th>
              <th className="py-2" style={styles.header}>
                Description
              </th>
              <th className="py-2" style={styles.header}>
                Category
              </th>
              <th className="py-2" style={styles.header}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allPets.map((pet) => (
              <tr key={pet._id}>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.name}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.breed_group}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.size}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.lifespan}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.origin}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.temperament}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {expandedPetId === pet._id
                    ? pet.description
                    : truncateText(pet.description, 100)}
                  {pet.description.length > 100 && (
                    <Button
                      variant="text"
                      style={styles.button}
                      onClick={() => handleToggleDescription(pet._id)}
                    >
                      {expandedPetId === pet._id ? "See Less" : "See More"}
                    </Button>
                  )}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  {pet.category}
                </td>
                <td className="border px-4 py-2" style={styles.cell}>
                  <Button color="blue" onClick={() => handleEditPet(pet)}>
                    Edit
                  </Button>
                  <Button color="red" onClick={() => handleDeletePet(pet._id)}>
                    Delete
                  </Button>
                  <ConfirmModal
                    setDeletePetId={setDeletePetId}
                    deletePetId={deletePetId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPet && (
        <Dialog
          className="overflow-y-auto"
          style={{ maxHeight: "700px", overflowY: "auto" }}
          size="lg"
          open={isEditModalOpen}
          handler={() => setIsEditModalOpen(false)}
        >
          <div
            className={`p-4 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl mb-4">Edit Pet</h2>
            <form onSubmit={handleUpdatePet} className="space-y-4">
              <Input
                type="text"
                name="name"
                label="Name"
                value={selectedPet.name}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="breed_group"
                label="Breed Group"
                value={selectedPet.breed_group}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="size"
                label="Size"
                value={selectedPet.size}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="lifespan"
                label="Lifespan"
                value={selectedPet.lifespan}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="origin"
                label="Origin"
                value={selectedPet.origin}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="temperament"
                label="Temperament"
                value={selectedPet.temperament}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Textarea
                name="description"
                label="Description"
                value={selectedPet.description}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
              <Input
                type="text"
                name="image"
                label="Image URL"
                value={selectedPet.image}
                onChange={handleInputChange}
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />

              <Select
                name="category"
                label="Category"
                value={selectedPet.category}
                onChange={(value) =>
                  setSelectedPet((prev) => ({ ...prev, category: value }))
                }
                required
                className={`${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              >
                <Option value="Dog">Dog</Option>
                <Option value="Cat">Cat</Option>
                <Option value="Bird">Bird</Option>
              </Select>
              <div>
                {selectedPet.colors.map((color, index) => (
                  <div key={index} className="space-x-2 flex items-center">
                    <Input
                      type="text"
                      value={color}
                      readOnly
                      className={`${
                        theme === "dark" ? "bg-gray-700 text-white" : ""
                      }`}
                    />
                    <Button
                      color="red"
                      onClick={() => handleRemoveColor(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="space-x-2 flex items-center">
                  <Input
                    type="text"
                    value={newColor}
                    onChange={handleColorInputChange}
                    placeholder="New Color"
                    className={`${
                      theme === "dark" ? "bg-gray-700 text-white" : ""
                    }`}
                  />
                  <Button color="blue" onClick={handleAddColor}>
                    Add Color
                  </Button>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button color="blue" type="submit">
                  Save
                </Button>
                <Button color="red" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default AdminContent;
