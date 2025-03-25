import React from "react";
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, Tooltip, Legend,
  BarChart, Bar, CartesianGrid, ResponsiveContainer
} from "recharts";

const dataPie = [
  { name: "사용", value: 76.5, color: "#4F46E5" },
  { name: "비사용", value: 23.5, color: "#F97316" }
];

const dataLine = [
  { month: "1월", active: 2000, inactive: 3000 },
  { month: "2월", active: 4000, inactive: 2000 },
  { month: "3월", active: 5000, inactive: 1500 },
  { month: "4월", active: 7500, inactive: 1300 },
  { month: "5월", active: 8000, inactive: 800 },
  { month: "6월", active: 9000, inactive: 700 },
  { month: "7월", active: 10000, inactive: 600 }
];

const dataBar = [
  { name: "1월", percentage: 20 },
  { name: "2월", percentage: 45 },
  { name: "3월", percentage: 55 },
  { name: "4월", percentage: 67 },
  { name: "5월", percentage: 85 },
  { name: "6월", percentage: 100 }
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* 헤더로 씀 */}
      <header className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          CouBot 대시보드
        </h1>
        <p className="text-gray-600 mt-2">매출 효과 및 만족도를 한눈에 확인하세요</p>
      </header>
      
      {/* 주요 지표 임*/}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-lg font-medium text-gray-500">설치율</div>
          <div className="text-4xl font-bold text-indigo-600 mt-2">76.5%</div>
          <div className="text-sm text-gray-400 mt-1">전월 대비 +2.3%</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-lg font-medium text-gray-500">만족도</div>
          <div className="text-4xl font-bold text-indigo-600 mt-2">84.5%</div>
          <div className="text-sm text-gray-400 mt-1">전월 대비 +1.5%</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-lg font-medium text-gray-500">재방문율</div>
          <div className="text-4xl font-bold text-indigo-600 mt-2">92.3%</div>
          <div className="text-sm text-gray-400 mt-1">전월 대비 +4.7%</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-lg font-medium text-gray-500">직원 만족도</div>
          <div className="text-4xl font-bold text-indigo-600 mt-2">97.5%</div>
          <div className="text-sm text-gray-400 mt-1">전월 대비 +0.5%</div>
        </div>
      </div>
      
      {/* 차트 섹션이고 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 파이 차트임 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            설치 및 사용 현황
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 라인 차트이다 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
            월별 사용자 트렌드
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#4F46E5" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="활성화 된 매장"
              />
              <Line 
                type="monotone" 
                dataKey="inactive" 
                stroke="#F97316" 
                strokeWidth={2}
                name="비활성화 된 매장"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 바 차트임 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            설치 지점 월별 재방문율
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value}%`, '재방문율']}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Bar 
                dataKey="percentage" 
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="재방문율"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* 게이지 차트임 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f0f0f0" 
                  strokeWidth="10"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#4F46E5" 
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - 0.845)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="283" 
                    to={283 * (1 - 0.845)} 
                    dur="1s" 
                    fill="freeze" 
                  />
                </circle>
                <text 
                  x="50" 
                  y="35" 
                  textAnchor="middle" 
                  fontSize="10" 
                  fontWeight="bold"
                  fill="#666"
                >
                  기업 만족도
                </text>
                <text 
                  x="50" 
                  y="60" 
                  textAnchor="middle" 
                  fontSize="22" 
                  fontWeight="bold"
                  fill="#4F46E5"
                >
                  84.5%
                </text>
              </svg>
            </div>
            <div className="border-t border-gray-100 w-full my-4"></div>
            <div className="flex items-center justify-between w-full">
              <div className="text-center">
                <p className="text-gray-500 text-xs">직원 만족도</p>
                <div className="text-xl font-bold text-indigo-600">97.5%</div>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">수익 증가율</p>
                <div className="text-xl font-bold text-indigo-600">23.8%</div>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">연간 성장</p>
                <div className="text-xl font-bold text-indigo-600">68.2%</div>
              <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                기업 만족도 현황
              </h2>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 만족도 현황 설명한거 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          만족도 현황 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-4 rounded-xl">
            <h3 className="text-indigo-700 font-semibold mb-2">높은 기업 만족도</h3>
            <p className="text-gray-700 text-sm">CouBot 설치 기업 중 77%가 만족을 표현하며, 청과물 시장 내 효율성 증대에 기여하고 있습니다.</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="text-orange-700 font-semibold mb-2">고객의 소리 경청</h3>
            <p className="text-gray-700 text-sm">23%의 불만족 의견을 면밀히 분석하여, 사용자 경험 개선 및 기능 업데이트에 반영하고 있습니다.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="text-green-700 font-semibold mb-2">목표</h3>
            <p className="text-gray-700 text-sm">지속적인 소통과 기술 개발을 통해 100% 만족도를 달성하는 것이 CouBot의 목표입니다.</p>
          </div>
        </div>
      </div>
      
      {/* 푸터위에 그거 기없에서 주로 만들어두는거 */}
      <footer className="text-center text-gray-400 text-sm">
        © 2023 CouBot. 사랑해요 쿠봇~~.
      </footer>
    </div>
  );
};

export default Dashboard;
