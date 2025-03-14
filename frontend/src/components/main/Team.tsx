import React from 'react';
import "./Team.css";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoIosHome } from "react-icons/io";

const Team: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8"  >
      <h1 className="text-3xl font-bold text-center mb-8">강영수와 아이들</h1>
      <h1 className='text-4xl font-bold text-center mb-8'>로봇과 함께하는 미래형 물류 시스템</h1>

      <div className='cubot_info'>
        <div className='border border-indigo-800' style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{fontSize: '40px', color: '#333', animation: 'slideIn 2s ease-out'}}>
            자율배송 로봇 <span style={{ color: '#FF6347', fontWeight: 'bold' }}>쿠봇</span>이 대신 옮겨 드리겠습니다!
          </p>
        </div>
      </div>

      <div className="team_container">
        <div className="team_card">
          <div className="team_card-inner">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full">
                <img src="./images/강영수.jpg" alt="강 영 수" className="team_img" />
              </div>
              <div className="text-2xl font-semibold mt-5">강 영 수</div>
              <hr/>
              <div className= "text-xl font-semibold mb-5">프론트엔드, 백엔드</div>
              <hr/>
              <p><MdOutlinePhoneIphone/>010-6679-5780</p>
              <p><MdEmail/>geem1282@gmail.com</p>
              <p><IoIosHome/>미래기술융합학원</p>
              
            </div>
          </div>
        </div>

        <div className="team_card">
          <div className="team_card-inner">
            <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full">
              <img src="./images/이희성.png" alt="이 희 성" className="team_img" />
              </div>
              <div className="text-2xl font-semibold mt-5">이 희 성</div>
              <hr/>
              <div className= "text-xl font-semibold mb-5">프론트엔드, 백엔드</div>
              <hr/>
              <p><MdOutlinePhoneIphone/>010-6638-5438</p>
              <p><MdEmail/>lstar216@naver.com</p>
              <p><IoIosHome/>미래기술융합학원</p>
              
            </div>
          </div>
        </div>

        <div className="team_card">
          <div className="team_card-inner">
            <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full">
                <img src="./images/김희선.png" alt="김 희 선"  className="team_img" />
              </div>
              <div className="text-2xl font-semibold mt-5">김 희 선</div>
              <hr/>
              <div className="text-xl font-semibold mb-5">프론트엔드, 백엔드</div>
              <hr/>
              <p><MdOutlinePhoneIphone/>010-2960-7801</p>
              <p><MdEmail/>1209khs51@gmail.com</p>
              <p><IoIosHome/>미래기술융합학원</p>
            </div>
          </div>
        </div>

        <div className="team_card">
          <div className="team_card-inner">
            <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full">
                <img src="./images/이정희.jpg" alt="이 정 희" className="team_img" />
              </div>
              <div className="text-2xl font-semibold mt-5">이 정 희</div>
              <hr/>
              <div className="text-xl font-semibold mb-5">머신러닝, 딥러닝</div>
              <hr/>
              <p><MdOutlinePhoneIphone/>010-2742-2352</p>
              <p><MdEmail/>ggp05158@naver.com</p>
              <p><IoIosHome/>미래기술융합학원</p>
            </div>
          </div>
        </div>

        <div className="team_card">
          <div className="team_card-inner">
            <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full">
                <img src="./images/정성민.png" alt="정 성 민" className="team_img" />
              </div>
              
              <div className="text-2xl font-semibold mt-5">정 성 민</div>
              <hr/>
              <div className="text-xl font-semibold mb-5">ROS</div>
              <hr/>
              <p><MdOutlinePhoneIphone/>010-5090-3039</p>
              <p><MdEmail/>smjeong5090@naver.com</p>
              <p><IoIosHome/>미래기술융합학원</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
