import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function ApiData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const perPage = 6; // articles per page

  useEffect(() => {
    fetch("https://dev.to/api/articles?per_page=20")
      .then(res => res.json())
      .then(setData)
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">API Data</h2>
      <input
        className="border px-2 py-1 mb-4 w-full"
        placeholder="Search posts..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1); // Reset to first page on search
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginated.map(post => (
          <div
            key={post.id}
            className="transition-transform duration-300 hover:scale-105"
          >
            <Card>
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.description || post.body}</p>
            </Card>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}