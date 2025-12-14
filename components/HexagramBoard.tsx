import React from 'react';
import { HexagramLine } from '../types';
import { LineVisual } from './LineVisual';

interface HexagramBoardProps {
  lines: HexagramLine[];
}

export const HexagramBoard: React.FC<HexagramBoardProps> = ({ lines }) => {
  // Create an array of 6 slots, reversed because Line 6 is at the top visually
  const slots = [6, 5, 4, 3, 2, 1];

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-stone-700/50 opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-stone-600/50 opacity-20 pointer-events-none"></div>

        <div className="flex flex-col relative z-10 pr-12 md:pr-16">
            {slots.map((position) => {
                const line = lines.find(l => l.position === position);
                return (
                    <LineVisual key={position} line={line} isPlaceholder={!line} />
                );
            })}
        </div>
    </div>
  );
};