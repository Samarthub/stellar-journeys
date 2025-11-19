import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function Illustrator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#8B5CF6");
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#F59E0B", // Orange
    "#10B981", // Green
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#FBBF24", // Yellow
    "#000000", // Black
  ];

  return (
    <div className="min-h-screen galaxy-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">🎨 Touchless Illustrator</h1>
            <p className="text-muted-foreground">Draw your masterpiece!</p>
          </div>

          <Card className="p-6 space-y-4">
            {/* Color Palette */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-sm font-medium mr-2">Colors:</span>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    color === c ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="ml-4"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            {/* Canvas */}
            <div className="bg-white rounded-lg overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full cursor-crosshair"
                style={{ height: "500px" }}
              />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Click and drag to draw! More features coming soon... 🚀</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
