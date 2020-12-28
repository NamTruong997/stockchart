import Chart, { Border, CommonSeriesSettings, ConstantLine, Crosshair, Label, Legend, Point, ScrollBar, Series, Tooltip, ValueAxis, ZoomAndPan } from "devextreme-react/chart";
import * as React from "react";
import { useEffect, useState } from "react";

/**
 * TODO: Nên giữ lại define cũ: data: Array<{x: number, y: number}>.
 */
export interface ChartDemoProps {
  data: ChartItemDataType[];
  /**
   * TODO: theo theme ở bên ngoài.
   */
  color?: {
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    board: string;
  };
  theme?: string;
}

export const ChartDemo: React.FC<ChartDemoProps> = (props) => {
  const customizeTooltip = (pointInfo: any) => {
    const data: ChartItemDataType = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.y}`,
    };
  };
  const [dataChart, setDataChart] = useState<ChartItemDataType[]>([]);
  const { data } = props;

  useEffect(() => {
    setDataChart(data);
  }, [data]);

  const onChartZoomEnd = (e: any) => {
    e.cancel = e.range.endValue - e.range.startValue < MAX_SCROLL;
  };

  // const reduceData = (arr: ChartItemDataType[]) => {
  //   let arrChart: ChartItemDataType[] = [];
  //   return arr.reduce((arrChart, item, index) => {
  //     if (arrChart[arrChart.length - 1]?.y !== item.y) arrChart.push(item);
  //     return arrChart;
  //   }, arrChart);
  // };
  console.log(dataChart);
  return (
    <>
      <Chart title="Biểu đồ phân tích " dataSource={dataChart} onZoomEnd={onChartZoomEnd}>
        <ScrollBar visible={true} />
        {/* <Pane name="bottom" />
        <Series pane="bottom" /> */}
        <CommonSeriesSettings argumentField="x" type="line">
          <Point visible={false}></Point>
        </CommonSeriesSettings>
        <Series valueField="y" name="Chart 1" />
        {/* <Series valueField="y" name="Chart 2" />
        <Series valueField="y" name="Chart 3" /> */}

        {/* <ArgumentAxis argumentType="x" /> */}
        {/* <ValueAxis position="right" /> */}
        {/* <CommonAxisSettings endOnTick={false} /> */}

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
    </>
  );
};

const MAX_SCROLL = 500;

export type ChartItemDataType = {
  x: number;
  y: number;
  y1?: number;
  y2?: number;
};
