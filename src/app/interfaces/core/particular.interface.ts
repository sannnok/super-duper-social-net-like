export interface Particular {
  startPoint: {x: number, y: number},
  noiseTrack: number[],
  div: HTMLDivElement,
  currentDrawIndex: number,
  isSum: boolean;
}
