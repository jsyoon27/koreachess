import React from 'react';
import './Description.css';

const Description: React.FC = () => {
  return (
    <div className="description">
      <h3>게임 방법:</h3>
      <ul>
        <li> 자신의 기물을 클릭하여 선택하고, 이동 가능한 위치를 확인하세요</li>
        <li>파란 점이 표시된 위치로 이동할 수 있습니다</li>
        <li>상대의 將(楚) 또는 漢을 잡으면 승리합니다</li>
        <li>초는 녹색, 한은 빨간색으로 표시됩니다</li>
      </ul>
    </div>
  );
};
export default Description;
