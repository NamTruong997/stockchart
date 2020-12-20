/// <reference types="react-scripts" />

export declare const Chart: React.ComponentType<ChartProps> & {
  /** A component that renders the chart's label. */
  Label: React.ComponentType<ChartBase.LabelProps & { className?: string; style?: React.CSSProperties; [x: string]: any }>;
} & {
  Root: any;
};
