import { GoogleGenAI } from "@google/genai";
import { HexagramLine, LineType } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const interpretHexagram = async (lines: HexagramLine[], question: string): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "Vui lòng cấu hình API Key để sử dụng tính năng bình giải AI.";
  }

  // Format lines for the AI (Line 1 is bottom, Line 6 is top)
  // We sort by position just in case, though the app logic handles order.
  const sortedLines = [...lines].sort((a, b) => a.position - b.position);
  
  const lineDescription = sortedLines.map(l => {
    let status = "";
    switch(l.type) {
      case LineType.YangStatic: status = "Dương (Tĩnh)"; break;
      case LineType.YinStatic: status = "Âm (Tĩnh)"; break;
      case LineType.YangMoving: status = "Dương (Động - Hào biến)"; break;
      case LineType.YinMoving: status = "Âm (Động - Hào biến)"; break;
    }
    return `Hào ${l.position}: ${status}`;
  }).join("\n");

  const prompt = `
    Tôi vừa gieo một quẻ Lục Hào (Kinh Dịch) cho vấn đề: "${question || 'Tổng quát'}".
    
    Kết quả các hào từ dưới lên trên (Hào 1 đến Hào 6) như sau:
    ${lineDescription}

    Hãy đóng vai một chuyên gia phong thủy và kinh dịch lão làng. Hãy thực hiện các bước sau:
    1. Xác định tên quẻ Gốc (Quẻ Chủ) và tên quẻ Biến (nếu có hào động).
    2. Phân tích sơ lược ý nghĩa của quẻ chủ.
    3. Nếu có hào động, phân tích sự biến đổi và lời khuyên cụ thể từ hào động đó.
    4. Đưa ra lời khuyên tổng kết cho vấn đề của tôi.

    Trình bày kết quả dưới dạng Markdown dễ đọc, giọng văn cổ điển nhưng dễ hiểu, trang trọng.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Use standard generation for speed
      }
    });

    return response.text || "Không thể lấy kết quả bình giải.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI thần toán. Vui lòng thử lại sau.";
  }
};