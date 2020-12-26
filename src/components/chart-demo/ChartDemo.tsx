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

export type ChartItemDataType = {
  x: number;
  y: number;
  //Trạng thái của item hiện tại so với item trước đó
  labelType: "Tăng" | "Giảm" | "Bình thường";
};

export interface ChartDemoProps {
  data: number[];
}

const STANDARD_LENGTH = 2000;
const GREEN_COLOR = "#97C95C";
const BLACK_COLOR = "#000000";
const RED_COLOR = "#F5564A";

export const ChartDemo: React.FC<ChartDemoProps> = (props) => {
  const customizeTooltip = (pointInfo: any) => {
    const data = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.y}`,
    };
  };

  const getStatus = (value: number) => {
    return value === 0 ? "Bình thường" : value === 1 ? "Tăng" : "Giảm";
  };

  // Custom màu theo type
  const customizeSeries = (value: string) => {
    return value === "Tăng" ? { color: GREEN_COLOR } : value === "Giảm" ? { color: RED_COLOR } : { color: BLACK_COLOR };
  };
  const { data } = props;

  //Chuyển đổi mảng input 0,1 => mảng theo type và giá trị
  const formatData = (arr: number[]): ChartItemDataType[] => {
    let arrChart: ChartItemDataType[] = [];
    let yTemp = 0;

    return arr.reduce((arrChart, item, index) => {
      let obj: ChartItemDataType = {
        x: index,
        y: yTemp + item,
        labelType: getStatus(item),
      };
      arrChart.push(obj);
      yTemp += item;
      return arrChart;
    }, arrChart);
  };

  return (
    <Chart title="Biểu đồ phân tích " dataSource={formatData(data)} id="chart">
      <ArgumentAxis title={{ text: "Chỉ số index" }} />
      <ValueAxis title={{ text: "Giá trị" }}>
        <ConstantLine width={3} value={0} color="#ff7c7c" dashStyle="dash" />
      </ValueAxis>
      <ScrollBar visible={true} />

      {/* Phân loại dựa trên labelType */}
      <SeriesTemplate nameField="labelType" customizeSeries={customizeSeries} />

      <CommonSeriesSettings type="scatter" argumentField="x" valueField="y">
        {/* Resize cái point, nếu số lượng point nhiều thì point sẽ nhỏ lại */}
        <Point size={data.length < STANDARD_LENGTH ? 7 : 5} />
      </CommonSeriesSettings>

      <ZoomAndPan valueAxis="both" argumentAxis="both" dragToZoom={true} allowMouseWheel={true} panKey="shift" allowTouchGestures={true} />
      <Crosshair enabled={true}>
        <Label visible={true} />
      </Crosshair>
      <Tooltip enabled={true} customizeTooltip={customizeTooltip}></Tooltip>

      {/* Bảng phân loại theo type - ở giữa phía dưới */}
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
