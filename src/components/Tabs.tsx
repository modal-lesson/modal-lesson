import { useState } from "react";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = () => {
    setActiveTab((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="tabs tabs-boxed w-40 my-0 mx-auto mb-10">
      <button
        onClick={handleTabClick}
        className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
      >
        Monthly
      </button>
      <button
        onClick={handleTabClick}
        className={`tab ${activeTab === 0 ? "tab-active" : ""}`}
      >
        Yearly
      </button>
    </div>
  );
}
