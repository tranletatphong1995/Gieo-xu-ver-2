import { LineType } from "../types";

/**
 * Simulates casting 3 coins.
 * Face (Yang) = 3
 * Back (Yin) = 2
 * 
 * Sums:
 * 3+3+3 = 9 (Old Yang / Yang Moving) - Prob: 1/8
 * 3+3+2 = 8 (Young Yin / Yin Static) - Prob: 3/8
 * 3+2+2 = 7 (Young Yang / Yang Static) - Prob: 3/8
 * 2+2+2 = 6 (Old Yin / Yin Moving) - Prob: 1/8
 */
export const castSingleLine = (): { type: LineType, value: number } => {
  // Use crypto.getRandomValues for maximum randomness as requested
  const array = new Uint32Array(3);
  crypto.getRandomValues(array);
  
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    // value is either 2 or 3
    // even number from random -> 2, odd -> 3
    const coinValue = (array[i] % 2 === 0) ? 2 : 3;
    sum += coinValue;
  }

  let type: LineType;
  switch (sum) {
    case 6:
      type = LineType.YinMoving;
      break;
    case 7:
      type = LineType.YangStatic;
      break;
    case 8:
      type = LineType.YinStatic;
      break;
    case 9:
      type = LineType.YangMoving;
      break;
    default:
      type = LineType.YangStatic; // Should not happen
  }

  return { type, value: sum };
};