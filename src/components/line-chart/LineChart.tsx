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

const MAX_SCROLL = 300;

export type LineChartItemDataType = {
  x: number;
  y: number;
  y1?: number;
};

export interface LineChartProps {
  title?: string;
  data: LineChartItemDataType[];
  name: {
    seriesName: string;
    seriesName1?: string;
    axisName: string;
    axisName1?: string;
  };
  isShowSeconeLine?: boolean;
  palette?: Array<string> | PaletteType;
}

export const LineChart: React.FC<LineChartProps> = (props) => {
  const [dataChart, setDataChart] = useState<LineChartItemDataType[]>([]);
  const { data, palette, title, isShowSeconeLine = false, name } = props;

  useEffect(() => {
    setDataChart(data);
  }, [data]);

  const customizeTooltip = (pointInfo: any) => {
    const data: LineChartItemDataType = pointInfo.point.data;
    return {
      text: isShowSeconeLine ? `Giá trị: ${data.y} \n Biến động: ${data.y1}` : `Giá trị: ${data.y}`,
    };
  };

  const onChartZoomEnd = (e: any) => {
    if (e.actionType === "zoom") {
      //Disable chrome scroll
      e.event.preventDefault();
      e.cancel = e.range.endValue - e.range.startValue < MAX_SCROLL;
    }
  };

  const onZoomStart = (e: any) => {
    //Cancel zoom nếu đang không giữ Control hoặc đang trong tình trạng không Zoom
    if (e.actionType === "zoom" && !e.event.ctrlKey && Number.isInteger(e.range.startValue) && Number.isInteger(e.range.endValue)) {
      e.cancel = true;
    }
  };

  const onLegendClick = (e: any) => {
    e.target.isVisible() ? e.target.hide() : e.target.show();
  };

  return (
    <Chart title={title} dataSource={dataChart} onZoomEnd={onChartZoomEnd} onZoomStart={onZoomStart} palette={palette} onLegendClick={onLegendClick}>
      <ScrollBar visible={true} />
      <CommonAxisSettings grid={{ visible: false }} />
      <CommonSeriesSettings argumentField="x" type="line">
        <Point visible={false}></Point>
      </CommonSeriesSettings>
      <DataPrepareSettings sortingMethod={false} convertToAxisDataType={false} checkTypeForAllData={false} />

      <Series valueField="y" name={name?.seriesName} hoverMode="none" />
      <ValueAxis position="left" title={{ text: name?.axisName }}>
        <ConstantLine width={3} value={0} color="#000000" dashStyle="dash" />
      </ValueAxis>

      {isShowSeconeLine && <Series valueField="y1" name={name?.seriesName1} hoverMode="none" type="line" axis="y1" />}
      {isShowSeconeLine && <ValueAxis name="y1" position="right" title={{ text: name?.axisName1 }} />}

      <Tooltip enabled={true} customizeTooltip={customizeTooltip} shared={true} />
      <ZoomAndPan argumentAxis="both" dragToZoom={false} allowMouseWheel={true} panKey="ctrl" allowTouchGestures={true} />
      <Crosshair enabled={true} color="#949494" width={3} dashStyle="dot">
        <Label visible={true} backgroundColor="#949494">
          <Font color="#fff" size={12} />
        </Label>
      </Crosshair>
      <Legend verticalAlignment="bottom" horizontalAlignment="center" visible={isShowSeconeLine} />
    </Chart>
  );
};
