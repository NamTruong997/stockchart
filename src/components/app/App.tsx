import ChartDemo, { ChartItemDataType } from "components/chart-demo/ChartDemo";
import React, { useEffect, useState } from "react";
import "./App.scss";
const App: React.FC = () => {
  const [data, setData] = useState<ChartItemDataType[]>([]);
  const getStatus = (value: number) => {
    return value === 0 ? "Bình thường" : value === 1 ? "Tăng" : "Giảm";
  };

  useEffect(() => {
    let arrInput: number[] = [];

    const generateData = (n: number) => {
      const ret = [];
      let yTemp = 0;
      for (let i = 0; i < n; i += 1) {
        // Random [0,-1,1]
        let y = Math.floor(Math.random() * 3 + -1);
        arrInput.push(y);
        ret.push({ x: i, y: yTemp + y, type: getStatus(y) });
        yTemp += y;
      }
      console.log("Mảng input", arrInput);
      return ret;
    };

    const length: any = prompt("Nhập số lượng phần tử mảng", "");
    setData(generateData(parseInt(length)));
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
