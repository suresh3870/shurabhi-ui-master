import React from "react";
import ShopItem from "./shopItem";
import styled from "styled-components";
import Dosa from "../images/Dosa.jpg";
import Rice from "../images/Rice.jpg";
import Roti from "../images/Roti.jpg";
import JiraRice from "../images/Jira_rice.jpg";
import Dal from "../images/Dal.jpg";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

interface CartItems {
  cartItems: never[];
  setCartItems: React.Dispatch<any>;
}

interface PlanetProps {
  name: string;
  src: string;
  price: number;
  id: number;
}

const Items: React.FC<CartItems> = ({ cartItems, setCartItems }) => {
  const planets: Array<PlanetProps> = [
    {
      name: "Dosa",
      src: Dosa,
      price: 100,
      id: 1,
    },
    {
      name: "Rice",
      src: Rice,
      price: 200,
      id: 2,
    },
    {
      name: "Roti",
      src: Roti,
      price: 500,
      id: 3,
    },
    {
      name: "Jira Rice",
      src: JiraRice,
      price: 400,
      id: 4,
    },
    {
      name: "Dal",
      src: Dal,
      price: 1100,
      id: 5,
    },
  ];

  return (
    <Div>
      {planets.map((planet, i) => (
        <ShopItem
          key={i}
          planet={planet}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </Div>
  );
};

export default Items;
