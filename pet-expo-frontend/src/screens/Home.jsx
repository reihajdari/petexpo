import Header from "../components/header/Header";
import Cards from "../components/cards/Cards";
import Footer from "../components/footer/Footer";
import NavLinks from "../components/navLinks/NavLinks";
import { createContext, useContext, useState } from "react";
import { GlobalContext } from "../App";

export const CategoryContext = createContext();

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Dog");
  const { theme, setTheme } = useContext(GlobalContext);

  const pageStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f8f9fa",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: '100vh'
  };

  return (
    <div style={pageStyle}>
      <GlobalContext.Provider
        value={{
          searchTerm,
          setSearchTerm,
          category,
          setCategory,
          theme,
          setTheme,
        }}
      >
        <Header />
        <NavLinks />
        <Cards />
        <Footer />
      </GlobalContext.Provider>
    </div>
  );
}

export default Home;
