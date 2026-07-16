import { useEffect, useState } from "react";

import { getWishlist, removeWishlist } from "../services/wishlistService";

import { FaHeart, FaTrash, FaShoppingBag } from "react-icons/fa";

import { Link } from "react-router-dom";

function Wishlist() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeWishlist(id);

      loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div
        className="

min-h-screen

flex

items-center

justify-center

text-xl

font-bold

text-gray-600

"
      >
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div
      className="

min-h-screen

py-10

px-5

"
    >
      <div
        className="

max-w-7xl

mx-auto

"
      >
        {/* Header */}

        <div
          className="

text-center

mb-10

"
        >
          <div
            className="

flex

justify-center

mb-4

"
          >
            <div
              className="

w-20

h-20

rounded-full

bg-red-100

flex

items-center

justify-center

"
            >
              <FaHeart
                className="

text-red-500

text-4xl

"
              />
            </div>
          </div>

          <h1
            className="

text-4xl

font-extrabold

text-gray-800

"
          >
            My Wishlist
          </h1>

          <p
            className="

text-gray-600

mt-3

"
          >
            Your favourite products saved in one place
          </p>
        </div>

        {items.length === 0 ? (
          <div
            className="

max-w-md

mx-auto

bg-white

rounded-3xl

shadow-xl

p-10

text-center

"
          >
            <div
              className="

flex

justify-center

mb-5

"
            >
              <FaShoppingBag
                className="

text-6xl

text-gray-300

"
              />
            </div>

            <h2
              className="

text-2xl

font-bold

text-gray-700

"
            >
              Wishlist Empty
            </h2>

            <p
              className="

text-gray-500

mt-3

"
            >
              Add products you love and they will appear here
            </p>

            <Link
              to="/"
              className="

inline-block

mt-6

bg-indigo-600

text-white

px-8

py-3

rounded-xl

font-bold

hover:bg-indigo-700

transition

"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div
            className="

grid

grid-cols-1

sm:grid-cols-2

md:grid-cols-3

lg:grid-cols-4

gap-8

"
          >
            {items.map((item) => (
              <div
                key={item._id}
                className="

bg-white

rounded-3xl

shadow-lg

p-5

hover:shadow-2xl

hover:-translate-y-1

transition

duration-300

"
              >
                <img
                  src={`https://mern-ecommerce-rhhf.onrender.com${item.image}`}
                  alt={item.name}
                  className="

w-full

h-52

object-cover

rounded-2xl

"
                />

                <h3
                  className="

text-xl

font-bold

mt-5

text-gray-800

"
                >
                  {item.name}
                </h3>

                <p
                  className="

text-indigo-600

font-bold

text-lg

mt-2

"
                >
                  ₹ {item.price}
                </p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="

mt-5

w-full

bg-red-500

text-white

py-3

rounded-xl

flex

items-center

justify-center

gap-2

font-semibold

hover:bg-red-600

transition

"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
