import { useContext, useState, useEffect } from "react";
import { getAllPets, getSinglePet } from "../../api/data";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GlobalContext } from "../../App";

function Cards() {
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const { searchTerm, category } = useContext(GlobalContext);
  const { theme } = useContext(GlobalContext);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const pets = await getAllPets(searchTerm);
      setAllPets(pets);
    };
    fetchPets();
  }, [searchTerm]);

  useEffect(() => {
    let filteredRecords = allPets
      .filter((pet) => pet.category === category)
      .filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredRecords(filteredRecords);
  }, [allPets, category, searchTerm]);

  const {
    data: selectedPet,
    error: singlePetError,
    isLoading: isSinglePetLoading,
  } = useQuery({
    queryKey: ["singlePet", selectedPetId],
    queryFn: () => getSinglePet(selectedPetId),
    enabled: !!selectedPetId,
  });

  const spinerStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  if (!allPets.length) {
    return <div style={spinerStyle}>Loading all pets...</div>;
  }

  const handleReadMore = (petId) => {
    setSelectedPetId(petId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPetId(null);
    setIsModalOpen(false);
  };

  const cardStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };
  const modalStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    maxHeight: "500px",
  };

  const cardColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div
      style={cardStyle}
      className="flex flex-wrap gap-6 justify-center pt-12 "
    >
      {filteredRecords.map((pet, index) => (
        <Card key={index} className={`w-72 m-4 ${cardColor}`}>
          <CardHeader className="relative h-48">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" className={`mb-2 ${textColor}`}>
              Name: {pet.name}
            </Typography>
            <Typography className={`${textColor}`}>
              Origin: {pet.origin}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button size="sm" onClick={() => handleReadMore(pet._id)}>
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}

      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogHeader style={modalStyle}>Pet Details</DialogHeader>
          <DialogBody className="overflow-y-auto" style={modalStyle}>
            {isSinglePetLoading ? (
              <div>Loading...</div>
            ) : singlePetError ? (
              <div>Error fetching pet details: {singlePetError.message}</div>
            ) : (
              selectedPet && (
                <>
                  <Typography variant="h5" className="mb-2">
                    Name: {selectedPet.name}
                  </Typography>
                  <Typography>Origin: {selectedPet.origin}</Typography>
                  <Typography>
                    Breed Group: {selectedPet.breed_group}
                  </Typography>
                  <Typography>Size: {selectedPet.size}</Typography>
                  <Typography>Lifespan: {selectedPet.lifespan}</Typography>
                  <Typography>Colors:</Typography>
                  <ul className="list-disc ml-5 mb-2">
                    {selectedPet.colors?.map((color, index) => (
                      <li key={index}>{color}</li>
                    ))}
                  </ul>
                  <Typography>
                    Description: {selectedPet.description}
                  </Typography>
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    className="w-full h-auto mt-4"
                  />
                </>
              )
            )}
          </DialogBody>
          <DialogFooter style={modalStyle}>
            <Button variant="outlined" color="red" onClick={handleCloseModal}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}

export default Cards;
