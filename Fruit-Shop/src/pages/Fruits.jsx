// Example usage in Fruits.jsx
import React, { useState } from "react";
import Products from "../components/Products";

const fruits = [
  { name: "Apple", price: 50 },
  { name: "Banana", price: 10 },
  { name: "Orange", price: 20 },
];

export default function Fruits() {
  const [basket, setBasket] = useState([]);
  const [history, setHistory] = useState([]);

  const handleAddToBasket = (fruit) => setBasket([...basket, fruit]);

  const handleRemoveFromBasket = (name) => {
    // Remove one instance of the fruit by name
    const idx = basket.findIndex((item) => item.name === name);
    if (idx !== -1) {
      setBasket([...basket.slice(0, idx), ...basket.slice(idx + 1)]);
    }
  };

  const handleBuy = () => {
    if (basket.length === 0) return;
    // Group items by name and count quantity
    const summary = {};
    basket.forEach((item) => {
      if (!summary[item.name]) {
        summary[item.name] = { ...item, quantity: 0 };
      }
      summary[item.name].quantity += 1;
    });
    const items = Object.values(summary);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setHistory([{ items, total }, ...history]);
    setBasket([]);
  };

  return (
    <Products
      fruits={fruits}
      basket={basket}
      onAddToBasket={handleAddToBasket}
      onRemoveFromBasket={handleRemoveFromBasket}
      onBuy={handleBuy}
      history={history}
    />
  );
}