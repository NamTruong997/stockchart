import Chart, {
  CommonAxisSettings,
  CommonSeriesSettings,
  ConstantLine,
  Crosshair,
  DataPrepareSettings,
  Font,
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
  title?: string;
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
  const { data, palette, title } = props;

  useEffect(() => {
    setDataChart(data);
  }, [data]);

  const customizeTooltip = (pointInfo: any) => {
    const data: ChartItemDataType = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.y} \n Biến động: ${data.y1}`,
    };
  };

  const onChartZoomEnd = (e: any) => {
    e.cancel = e.range.endValue - e.range.startValue < MAX_SCROLL;
  };

  const onLegendClick = (e: any) => {
    e.target.isVisible() ? e.target.hide() : e.target.show();
  };

  return (
    <Chart title={title} dataSource={dataChart} onZoomEnd={onChartZoomEnd} palette={palette} onLegendClick={onLegendClick}>
      <ScrollBar visible={true} />
      <CommonAxisSettings grid={{ visible: false }} />
      <CommonSeriesSettings argumentField="x" type="line">
        <Point visible={false}></Point>
      </CommonSeriesSettings>
      <DataPrepareSettings sortingMethod={false} convertToAxisDataType={false} checkTypeForAllData={false} />

      <Series valueField="y" name="Chart 1" hoverMode="none" />
      <ValueAxis position="left" title={{ text: "Chỉ số" }}>
        <ConstantLine width={3} value={0} color="#000000" dashStyle="dash" />
      </ValueAxis>

      <Series valueField="y1" name="Chart 2" hoverMode="none" type="spline" axis="y1" />
      <ValueAxis name="y1" position="right" title={{ text: "Độ biến động" }} />

      <Tooltip enabled={true} customizeTooltip={customizeTooltip} shared={true} />
      <ZoomAndPan argumentAxis="both" dragToZoom={false} allowMouseWheel={true} panKey="shift" allowTouchGestures={true} />
      <Crosshair enabled={true} color="#949494" width={3} dashStyle="dot">
        <Label visible={true} backgroundColor="#949494">
          <Font color="#fff" size={12} />
        </Label>
      </Crosshair>
      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
    </Chart>
  );
};

const MAX_SCROLL = 300;

export type ChartItemDataType = {
  x: number;
  y: number;
  y1?: number;
};
