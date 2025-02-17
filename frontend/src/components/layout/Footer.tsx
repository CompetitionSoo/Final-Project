import React from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "팀소개", href: "/team" },
  { name: "갤러리", href: "/gallery" },
  { name: "개발과정", href: "/process" },
  { name: "제품소개", href: "/about" },
  { name: "사용자", href: "/control" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div>
            <h2 className="text-lg font-semibold mb-4">메뉴</h2>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-300 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">팀 정보</h2>
            <p className="text-gray-400 text-sm">
              강영수와 아이들
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">도움말</h2>
            <ul className="mt-4">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          © 2025 강영수와 아이들
        </div>
      </div>
    </footer>
  );
};

export default Footer;