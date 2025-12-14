export enum LineType {
  YinStatic = 'YinStatic', // Âm tĩnh (8)
  YangStatic = 'YangStatic', // Dương tĩnh (7)
  YinMoving = 'YinMoving', // Âm động (6)
  YangMoving = 'YangMoving', // Dương động (9)
}

export interface HexagramLine {
  position: number; // 1 to 6
  type: LineType;
  value: number; // 6, 7, 8, 9
  timestamp: number;
}

export interface InterpretationResult {
  markdown: string;
}
