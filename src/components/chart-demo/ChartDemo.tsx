import Chart, {
  ArgumentAxis,
  Border,
  CommonSeriesSettings,
  ConstantLine,
  Crosshair,
  Label,
  Legend,
  Point,
  ScrollBar,
  SeriesTemplate,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
} from "devextreme-react/chart";
import * as React from "react";
import "./ChartDemo.scss";

export type ChartItemDataType = {
  x: number;
  y: number;
  type: string;
};

export interface ChartDemoProps {
  data: ChartItemDataType[];
}

const ChartDemo: React.FC<ChartDemoProps> = (props) => {
  const customizeTooltip = (pointInfo: any) => {
    const data = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.y}`,
    };
  };
  const customizeSeries = (value: string) => {
    return value === "Tăng" ? { color: "#97C95C" } : value === "Giảm" ? { color: "#F5564A" } : { color: "#000000" };
  };
  const { data } = props;
  console.log("Mảng chart", data);

  return (
    <Chart title="Biểu đồ phân tích " dataSource={data} id="chart">
      <ArgumentAxis title={{ text: "Chỉ số index" }} />
      <ValueAxis title={{ text: "Giá trị" }}>
        <ConstantLine width={3} value={0} color="#ff7c7c" dashStyle="dash" />
      </ValueAxis>
      <ScrollBar visible={true} />
      <SeriesTemplate nameField="type" customizeSeries={customizeSeries} />
      <CommonSeriesSettings type="scatter" argumentField="x" valueField="y">
        <Point size={data.length < 2000 ? 7 : 5} />
      </CommonSeriesSettings>
      <ZoomAndPan valueAxis="both" argumentAxis="both" dragToZoom={true} allowMouseWheel={true} panKey="shift" />
      <Crosshair enabled={true}>
        <Label visible={true} />
      </Crosshair>
      <Tooltip enabled={true} customizeTooltip={customizeTooltip}></Tooltip>

      <Legend
        position="outside"
        horizontalAlignment="center"
        verticalAlignment="bottom"
        customizeText={(arg: any) => {
          return arg.seriesName;
        }}
      >
        <Border visible={true} />
      </Legend>
    </Chart>
  );
};

export default ChartDemo;
