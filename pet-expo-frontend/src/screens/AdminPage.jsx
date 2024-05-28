import { createContext, useContext, useEffect, useState } from "react";
import AddPet from "../components/admin/AddPet";
import AdminContent from "../components/admin/AdminContent";
import AdminHeader from "../components/admin/AdminHeader";
import { GlobalContext } from "../App";

export const PetContext = createContext();

function AdminPage() {
  const [allPets, setAllPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const mainStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div style={mainStyle}>
      <PetContext.Provider
        value={{
          allPets,
          setAllPets,
          searchTerm,
          setSearchTerm,
        }}
      >
        <AdminHeader />
        <AddPet />
        <AdminContent />
      </PetContext.Provider>
    </div>
  );
}

export default AdminPage;
