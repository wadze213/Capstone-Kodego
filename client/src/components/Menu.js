import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Axios from "axios";

const Menu = () => {
  Axios.defaults.withCredentials = true;

  const [Menu, setMenu] = useState([]);

  // Get menu data
  useEffect(() => {
    Axios.get("http://localhost:3001/api/DisplayMenu").then((response) => {
      setMenu(response.data);
    });
  }, []);

  return (
    <div>
      <MenuList recipeSample={Menu} remove={false} />
    </div>
  );
};

export default Menu;
