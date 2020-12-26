import { ChartDemo } from "components/chart-demo/ChartDemo";
import React, { useEffect, useState } from "react";
import "./App.scss";
const App: React.FC = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    let arrInput: number[] = [];

    const length: any = prompt("Nhập số lượng phần tử mảng", "");
    for (let i = 0; i < length; i += 1) {
      // Random [0,-1,1]
      let numberRan = Math.floor(Math.random() * 3 + -1);
      arrInput.push(numberRan);
    }

    setData(arrInput);
  }, []);

  return (
    <div className="com-home">
      {data.length !== 0 && <ChartDemo data={data} />}
      <div style={{ marginLeft: 100 }}>
        <h3>Dùng chuột giữa hoặc quét giữ chuột trái để Zoom</h3>
        <h3>Giữ phím SHIFT để scroll</h3>
      </div>
    </div>
  );
};

export default App;
