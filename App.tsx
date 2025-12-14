import React, { useState, useRef } from 'react';
import { HexagramLine } from './types';
import { castSingleLine } from './utils/iching';
import { HexagramBoard } from './components/HexagramBoard';

const MAX_LINES = 6;

const App: React.FC = () => {
  const [lines, setLines] = useState<HexagramLine[]>([]);
  const [isCasting, setIsCasting] = useState(false);
  const [question, setQuestion] = useState("");
  
  // Ref for auto-scrolling to bottom if needed, though usually the board is fixed height
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentLineNumber = lines.length + 1;
  const isComplete = lines.length === MAX_LINES;

  const handleCast = () => {
    if (isComplete || isCasting) return;

    setIsCasting(true);
    
    // Simulate a short delay for "ritual" feeling and animation
    setTimeout(() => {
        const result = castSingleLine();
        const newLine: HexagramLine = {
            position: currentLineNumber,
            type: result.type,
            value: result.value,
            timestamp: Date.now()
        };
        
        setLines(prev => [...prev, newLine]);
        setIsCasting(false);
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa quẻ này và gieo lại từ đầu?")) {
        setLines([]);
        setQuestion("");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#f5f5f4] selection:bg-amber-900 selection:text-white flex flex-col items-center py-8 px-4">
      
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-amber-500 serif tracking-wide">
            Lục Hào Thần Toán
        </h1>
        <p className="text-stone-400 italic text-sm md:text-base">
            Gieo quẻ Kinh Dịch - Kết nối Càn Khôn
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-2xl flex flex-col gap-8">
        
        {/* Input Question (Optional) */}
        {!isComplete && (
            <div className="w-full max-w-md mx-auto">
                <input 
                    type="text" 
                    placeholder="Nhập điều bạn muốn hỏi (tùy chọn)..." 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-stone-800 border-b border-stone-600 p-3 text-center text-stone-200 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-stone-600"
                    disabled={lines.length > 0} 
                />
            </div>
        )}

        {/* The Board */}
        <HexagramBoard lines={lines} />

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
            {!isComplete ? (
                <div className="text-center">
                     <p className="mb-4 text-stone-400 text-sm">
                        Đang gieo hào: <span className="text-amber-400 font-bold text-lg">{currentLineNumber}</span> / 6
                    </p>
                    <button
                        onClick={handleCast}
                        disabled={isCasting}
                        className={`
                            relative group overflow-hidden rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center
                            border-4 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]
                            ${isCasting 
                                ? 'border-stone-600 bg-stone-800 cursor-wait opacity-80' 
                                : 'border-amber-600 bg-stone-900 hover:bg-stone-800 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-95'
                            }
                        `}
                    >
                         <span className={`text-xl md:text-2xl font-bold serif uppercase z-10 ${isCasting ? 'text-stone-500' : 'text-amber-500'}`}>
                             {isCasting ? '...' : 'Gieo'}
                         </span>
                         
                         {/* Button Ripple Effect decoration */}
                         <div className="absolute inset-0 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-500"></div>
                    </button>
                    <p className="mt-4 text-xs text-stone-500 max-w-xs mx-auto">
                        Tập trung tinh thần vào câu hỏi, sau đó bấm nút để gieo từng hào.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full max-w-md items-center">
                     <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700 text-center animate-pulse w-full">
                        <span className="text-green-400 font-bold block">Đã gieo xong quẻ!</span>
                     </div>
                     
                     <button 
                        onClick={handleReset}
                        className="px-8 py-3 rounded border border-stone-600 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors uppercase text-sm tracking-wider"
                    >
                        Gieo lại
                    </button>
                </div>
            )}
        </div>

      </main>

      <div ref={bottomRef} />

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;