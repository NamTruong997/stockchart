import { ChartDemo, ChartItemDataType } from "components/chart-demo/ChartDemo";
import React, { useEffect, useState } from "react";
import "./App.scss";
import dataArr from "chart-data.json";

const App: React.FC = () => {
  const [data] = useState<ChartItemDataType[]>(dataArr);
  const [length, setLength] = useState();

  useEffect(() => {
    // let arrInput: number[] = [];

    const length: any = prompt("Nhập số lượng phần tử mảng", "");
    setLength(length);
    // for (let i = 0; i < 700; i += 1) {
    //   // Random [0,-1,1]
    //   let numberRan = Math.floor(Math.random() * 3 + -1);
    //   arrInput.push(numberRan);
    // }

    //  setData(formatData(arrInput));
  }, []);

  //Chuyển đổi mảng input 0,1 => mảng theo type và giá trị
  // const formatData = (arr: number[], multiplier: number = 1): ChartItemDataType[] => {
  //   let arrChart: ChartItemDataType[] = [];
  //   let yTemp = 0;

  //   return arr.reduce((arrChart, item, index) => {
  //     let obj: ChartItemDataType = {
  //       x: index * multiplier,
  //       y: yTemp + item,
  //       y1: yTemp,
  //     };
  //     arrChart.push(obj);
  //     yTemp += item;
  //     return arrChart;
  //   }, arrChart);
  // };

  return <div className="com-home">{data.length !== 0 && <ChartDemo data={data.slice(0, length)} palette="Material" />}</div>;
};

export default App;
