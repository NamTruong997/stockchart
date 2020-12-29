import { ChartDemo, ChartItemDataType } from "components/chart-demo/ChartDemo";
import React, { useEffect, useState } from "react";
import "./App.scss";
const App: React.FC = () => {
  const [data, setData] = useState<ChartItemDataType[]>([]);

  useEffect(() => {
    let arrInput: number[] = [];

    const length: any = prompt("Nhập số lượng phần tử mảng", "");
    for (let i = 0; i < length; i += 1) {
      // Random [0,-1,1]
      let numberRan = Math.floor(Math.random() * 3 + -1);
      arrInput.push(numberRan);
    }

    setData(formatData(arrInput));
  }, []);

  //Chuyển đổi mảng input 0,1 => mảng theo type và giá trị
  const formatData = (arr: number[], multiplier: number = 1): ChartItemDataType[] => {
    let arrChart: ChartItemDataType[] = [];
    let yTemp = 0;

    return arr.reduce((arrChart, item, index) => {
      let obj: ChartItemDataType = {
        x: index * multiplier,
        y: yTemp + item,
      };
      arrChart.push(obj);
      yTemp += item;
      return arrChart;
    }, arrChart);
  };

  return <div className="com-home">{data.length !== 0 && <ChartDemo data={data} palette={"Material"} />}</div>;
};

export default App;
