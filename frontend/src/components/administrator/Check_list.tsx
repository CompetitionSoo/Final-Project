import React from 'react';

const data = [
  { Num: 1, BotID: "BOT-001", Filename: "/images/item1.jpg", Site: "A", Item: "채소" },
  { Num: 2, BotID: "BOT-002", Filename: "/images/item2.jpg", Site: "B", Item: "과일" },
  { Num: 3, BotID: "BOT-003", Filename: "/images/item3.jpg", Site: "C", Item: "채소" },
  { Num: 4, BotID: "BOT-004", Filename: "/images/item4.jpg", Site: "D", Item: "과일" },
  { Num: 5, BotID: "BOT-005", Filename: "/images/item5.jpg", Site: "A", Item: "채소" },
  { Num: 6, BotID: "BOT-006", Filename: "/images/item6.jpg", Site: "B", Item: "과일" },
  { Num: 7, BotID: "BOT-007", Filename: "/images/item7.jpg", Site: "C", Item: "채소" },
  { Num: 8, BotID: "BOT-008", Filename: "/images/item8.jpg", Site: "D", Item: "과일" },
  { Num: 9, BotID: "BOT-009", Filename: "/images/item9.jpg", Site: "A", Item: "채소" },
  { Num: 10, BotID: "BOT-010", Filename: "/images/item10.jpg", Site: "B", Item: "과일" },
];

const Check_list: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">항목 조회</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Num</th>
              <th className="px-6 py-3 text-left text-gray-600">BotID</th>
              <th className="px-6 py-3 text-left text-gray-600">Filename</th>
              <th className="px-6 py-3 text-left text-gray-600">Site</th>
              <th className="px-6 py-3 text-left text-gray-600">Item</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.Num} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">{row.Num}</td>
                <td className="px-6 py-4">{row.BotID}</td>
                <td className="px-6 py-4">
                  <img src={row.Filename} alt={row.Item} className="w-16 h-16 rounded-lg object-cover" />
                </td>
                <td className="px-6 py-4">{row.Site}</td>
                <td className="px-6 py-4">{row.Item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Check_list; 