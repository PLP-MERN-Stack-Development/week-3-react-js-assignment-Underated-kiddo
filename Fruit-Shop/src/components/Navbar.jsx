import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <span className="font-bold">Fruit Shop</span>
      <div>
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/api" className="mr-3 hover:underline">API Data</Link>
        <Link to="/fruits" className ="hover:underline">Fruits</Link>
      </div>
    </nav>
  );
}