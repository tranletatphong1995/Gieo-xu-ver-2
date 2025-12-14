import React from 'react';
import { LineType, HexagramLine } from '../types';

interface LineVisualProps {
  line?: HexagramLine;
  isPlaceholder?: boolean;
}

export const LineVisual: React.FC<LineVisualProps> = ({ line, isPlaceholder }) => {
  if (isPlaceholder || !line) {
    return (
      <div className="w-full h-8 md:h-10 my-1 md:my-2 rounded bg-stone-800/30 border border-stone-700/30 flex items-center justify-center opacity-50">
        <span className="text-stone-600 text-xs">Chưa gieo</span>
      </div>
    );
  }

  const isYang = line.type === LineType.YangStatic || line.type === LineType.YangMoving;
  const isMoving = line.type === LineType.YangMoving || line.type === LineType.YinMoving;
  
  // Color: Red if moving, Zinc-300 if static
  const colorClass = isMoving ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.6)]' : 'bg-stone-300 shadow-[0_0_5px_rgba(214,211,209,0.3)]';
  
  // Animation for appearance
  const animationClass = "animate-[fadeIn_0.5s_ease-out]";

  return (
    <div className={`w-full h-8 md:h-10 my-1 md:my-2 flex items-center justify-between relative ${animationClass}`}>
       {/* Visual Representation */}
      <div className="flex-1 h-full flex items-center justify-center relative w-full px-4 md:px-12">
        {isYang ? (
          // Solid Line
          <div className={`w-full h-4 md:h-5 rounded-sm ${colorClass} transition-all duration-500`}></div>
        ) : (
          // Broken Line
          <div className="w-full flex justify-between gap-4 md:gap-8">
             <div className={`flex-1 h-4 md:h-5 rounded-sm ${colorClass} transition-all duration-500`}></div>
             <div className={`flex-1 h-4 md:h-5 rounded-sm ${colorClass} transition-all duration-500`}></div>
          </div>
        )}
      </div>

      {/* Info Tag (Position & Type) */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center translate-x-full pl-2">
         <span className={`text-[10px] md:text-xs font-mono uppercase tracking-wider whitespace-nowrap ${isMoving ? 'text-red-400 font-bold' : 'text-stone-500'}`}>
            Hào {line.position} {isMoving ? '•' : ''}
         </span>
      </div>
    </div>
  );
};