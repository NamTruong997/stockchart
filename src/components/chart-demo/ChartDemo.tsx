import Chart, {
  Border,
  CommonSeriesSettings,
  ConstantLine,
  Crosshair,
  DataPrepareSettings,
  Label,
  Legend,
  Point,
  ScrollBar,
  Series,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
} from "devextreme-react/chart";
import { PaletteType } from "devextreme/viz/palette";
import * as React from "react";
import { useEffect, useState } from "react";

export interface ChartDemoProps {
  data: ChartItemDataType[];
  color?: {
    line: string;
    chart: string;
    board: string;
  };
  palette?: Array<string> | PaletteType;
}

export const ChartDemo: React.FC<ChartDemoProps> = (props) => {
  const [dataChart, setDataChart] = useState<ChartItemDataType[]>([]);
  const { data, palette } = props;

  useEffect(() => {
    setDataChart(data);
  }, [data]);

  const customizeTooltip = (pointInfo: any) => {
    const data: ChartItemDataType = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.y}`,
    };
  };

  const onChartZoomEnd = (e: any) => {
    e.cancel = e.range.endValue - e.range.startValue < MAX_SCROLL;
  };

  console.log(dataChart);
  return (
    <Chart title="Biểu đồ phân tích " dataSource={dataChart} onZoomEnd={onChartZoomEnd} palette={palette}>
      <ScrollBar visible={true} />
      <CommonSeriesSettings argumentField="x" type="line">
        <Point visible={false}></Point>
      </CommonSeriesSettings>
      <Series valueField="y" name="Chart 1" />
      <DataPrepareSettings sortingMethod={false} convertToAxisDataType={false} checkTypeForAllData={false} />
      <ValueAxis pane="bottom" title={{ text: "Chỉ số" }}>
        <ConstantLine width={3} value={0} color="#ff7c7c" dashStyle="dash" />
      </ValueAxis>
      <Tooltip enabled={true} customizeTooltip={customizeTooltip}></Tooltip>

      <ZoomAndPan argumentAxis="both" dragToZoom={true} allowMouseWheel={true} panKey="shift" allowTouchGestures={true} />
      <Crosshair enabled={true}>
        <Label visible={true} />
      </Crosshair>
      <Legend visible={false}>
        <Border visible={false} />
      </Legend>
    </Chart>
  );
};

const MAX_SCROLL = 400;

export type ChartItemDataType = {
  x: number;
  y: number;
};
