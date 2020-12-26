/* eslint-disable react-hooks/exhaustive-deps */
import Chart, { Border, CommonAxisSettings, ConstantLine, Crosshair, Label, Legend, Pane, ScrollBar, Series, Tooltip, ValueAxis, ZoomAndPan } from "devextreme-react/chart";
import * as React from "react";
import { useEffect, useState } from "react";

export type ChartItemDataType = {
  arg: number;
  val: number;
};

export interface ChartDemoProps {
  data: number[];
}

const MAX_SCROLL = 500;

export const ChartDemo: React.FC<ChartDemoProps> = (props) => {
  const customizeTooltip = (pointInfo: any) => {
    const data = pointInfo.point.data;
    return {
      text: `Giá trị: ${data.val}`,
    };
  };
  const [dataChart, setDataChart] = useState<ChartItemDataType[]>([]);
  const { data } = props;

  //Chuyển đổi mảng input 0,1 => mảng theo type và giá trị
  const formatData = (arr: number[], multiplier: number = 1): ChartItemDataType[] => {
    let arrChart: ChartItemDataType[] = [];
    let yTemp = 0;

    return arr.reduce((arrChart, item, index) => {
      let obj: ChartItemDataType = {
        arg: index * multiplier,
        val: yTemp + item,
      };
      arrChart.push(obj);
      yTemp += item;
      return arrChart;
    }, arrChart);
  };

  useEffect(() => {
    setDataChart(formatData(data));
  }, [data]);

  const onChartZoomEnd = (e: any) => {
    e.cancel = e.range.endValue - e.range.startValue < MAX_SCROLL;
  };

  return (
    <>
      <Chart title="Biểu đồ phân tích " dataSource={dataChart} onZoomEnd={onChartZoomEnd}>
        <ScrollBar visible={true} />
        <Pane name="bottom" />
        <Series pane="bottom" />
        <CommonAxisSettings endOnTick={false} />

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
