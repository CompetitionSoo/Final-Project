import { useEffect, useState } from "react";

interface InventoryItem {
  "No.": number;
  "로봇ID": string;
  "탐지항목": string;
  "위치": string;
  "재고현황": string;
  "시간": string;
}

const InventoryTable = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 재고 조회</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">로봇ID</th>
            <th className="border px-4 py-2">탐지항목</th>
            <th className="border px-4 py-2">위치</th>
            <th className="border px-4 py-2">재고현황</th>
            <th className="border px-4 py-2">시간</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item["No."]} className="text-center">
              <td className="border px-4 py-2">{item["No."]}</td>
              <td className="border px-4 py-2">{item["로봇ID"]}</td>
              <td className="border px-4 py-2">{item["탐지항목"]}</td>
              <td className="border px-4 py-2">{item["위치"]}</td>
              <td className="border px-4 py-2">{item["재고현황"]}</td>
              <td className="border px-4 py-2">{item["시간"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
