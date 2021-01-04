import { LineChart, LineChartItemDataType } from "components/line-chart/LineChart";
import React, { useEffect, useState } from "react";
import "./App.scss";
import dataArr from "chart-data.json";

const App: React.FC = () => {
  const [data] = useState<LineChartItemDataType[]>(dataArr);
  const [length, setLength] = useState();

  useEffect(() => {
    const length: any = prompt("Nhập số lượng phần tử mảng", "");
    setLength(length);
  }, []);

  return (
    <div className="com-home" style={{ padding: 15 }}>
      <h1 className="text">Lorem Ipsum is simply 1.1</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>

      <LineChart
        data={data.slice(0, length)}
        palette="Material"
        // name={{ seriesName: "Chart Name", axisName: "Chỉ số" }}
        name={{ seriesName: "", axisName: "" }}
      />
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>

      <LineChart
        data={data.slice(0, length! * 2)}
        palette="Dark Moon"
        isShowSeconeLine={true}
        name={{ seriesName: "", axisName: "", seriesName1: "", axisName1: "" }}
        // name={{ seriesName: "Chart Name", axisName: "Chỉ số", seriesName1: "Chart Name 1", axisName1: "Độ biến động" }}
      />
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
      <h1 className="text">Lorem Ipsum is simply</h1>
    </div>
  );
};

export default App;
