import React from "react";
import Button from "./Button";

export default function Products({
  fruits,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onBuy,
  history,
}) {
  // Group basket items by name for quantity display
  const basketSummary = basket.reduce((acc, item) => {
    acc[item.name] = acc[item.name]
      ? { ...item, quantity: acc[item.name].quantity + 1 }
      : { ...item, quantity: 1 };
    return acc;
  }, {});

  const basketItems = Object.values(basketSummary);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fruits.map((fruit) => (
          <div
            key={fruit.name}
            className="bg-white p-4 rounded shadow flex flex-col items-center"
          >
            <span className="text-2xl font-bold mb-2">{fruit.name}</span>
            <span className="mb-4">Price: ksh{fruit.price}</span>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => onAddToBasket(fruit)}
            >
              Add to Basket
            </Button>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Basket:</h2>
        {basket.length === 0 ? (
          <p>No items in basket.</p>
        ) : (
          <ul>
            {basketItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between mb-2">
                <span>
                  {item.name} x {item.quantity} - ksh{item.price * item.quantity}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  onClick={() => onRemoveFromBasket(item.name)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={onBuy}
        disabled={basket.length === 0}
      >
        Buy
      </Button>

      {/* Purchase History */}
      {history && history.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Purchase History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((purchase, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">
                  Purchase #{history.length - idx}
                </h3>
                <ul>
                  {purchase.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 font-bold">
                  Total: ksh{purchase.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}