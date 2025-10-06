import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import React, { useState } from "react";
import DisplayProducts from "../components/DisplayProducts";
import ProductAnalytics from "../components/ProductAnalytics";
import CreateProduct from "../components/CreateProduct";

const configTabs = [
  {
    id: "create",
    label: "Create Product",
    icon: PlusCircle,
    component: CreateProduct,
  },
  {
    id: "products",
    label: "Products",
    icon: ShoppingBasket,
    component: DisplayProducts,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart,
    component: ProductAnalytics,
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");
  return (
    <>
      <div className="flex flex-col items-center border">
        <h1 className="text-3xl font-bold text-emerald-500 mb-6">
          Admin Dashboard
        </h1>
        <div className="flex gap-8 justify-center">
          {configTabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`flex gap-1 items-center px-3 py-2 rounded-md cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
        {configTabs.map((tab) => {
          if (tab.id === activeTab) {
            return <tab.component />;
          }
        })}
      </div>
    </>
  );
};

export default AdminDashboard;
