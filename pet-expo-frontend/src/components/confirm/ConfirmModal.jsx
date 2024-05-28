import { Button, Dialog } from "@material-tailwind/react";
import { useContext } from "react";
import { deletePet } from "../../api/data";
import { PetContext } from "../../screens/AdminPage";

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ setDeletePetId, deletePetId }) => {
  const { setAllPets } = useContext(PetContext);

  const handleConfirmDelete = () => {
    try {
      deletePet(deletePetId);
      setAllPets((prevPets) =>
        prevPets.filter((pet) => pet._id !== deletePetId)
      );
      setDeletePetId(null);
    } catch (error) {
      console.error("Failed to delete the pet", error);
      alert("Failed to delete the pet. Please try again.");
    }
  };

  return (
    <div>
      <Dialog
        size="sm"
        open={!!deletePetId}
        handler={() => setDeletePetId(null)}
      >
        <div className="p-4">
          <p className="text-lg">Are you sure you want to delete this pet?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <Button color="blue" onClick={() => handleConfirmDelete()}>
              Yes
            </Button>
            <Button color="red" onClick={() => setDeletePetId(null)}>
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
