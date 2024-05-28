import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./screens/Home";
import { createContext, useState, useEffect } from "react";
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import AdminPage from "./screens/AdminPage";

// eslint-disable-next-line react-refresh/only-export-components
export const client = new QueryClient();
export const GlobalContext = createContext();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
    {
      path: "/adminpage",
      element: <AdminPage />,
    },
  ]);

  const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));
  const checkedThemeFromLocalStorage = themeFromLocalStorage
    ? themeFromLocalStorage
    : "light";

  const [theme, setTheme] = useState(checkedThemeFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
 

  return (
    <QueryClientProvider client={client}>
      <GlobalContext.Provider value={{ theme, setTheme }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
