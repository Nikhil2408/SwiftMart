import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = (props) => {
  const { category } = props;
  return (
    <div className="w-80 h-80 transition-transform duration-400 hover:scale-105 relative">
      <Link to={"/category" + category.href}>
        <img
          className="h-[100%] w-[100%] object-cover"
          src={category.imageUrl}
          alt={category.name}
        />
        <div className="absolute bottom-6 left-2 font-bold text-xl">
          {category.name}
        </div>
        <div className="absolute bottom-0.5 left-2 text-sm">
          Explore {category.name}
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
