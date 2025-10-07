import React from "react";
import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/tshirts", name: "T-Shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-emerald-400 font-bold">
        Explore Our Categories
      </h1>
      <p className="my-6">Discover the latest trends in eco-friendly fashion</p>
      <div className="flex justify-center flex-wrap gap-4 mb-4 lg:w-250">
        {categories.map((category) => {
          return <CategoryItem key={category.name} category={category} />;
        })}
      </div>
    </div>
  );
};

export default Home;
