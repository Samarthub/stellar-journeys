import { Level } from "@/config/levels";
import { Lock, CheckCircle2, PlayCircle } from "lucide-react";

type LevelMapProps = {
  levels: Level[];
  onLevelClick: (level: Level) => void;
};

export function LevelMap({ levels, onLevelClick }: LevelMapProps) {
  return (
    <div className="relative py-8">
      {/* Railway Path */}
      <div className="relative max-w-4xl mx-auto">
        {levels.map((level, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const isEvenRow = row % 2 === 0;
          const xPosition = isEvenRow ? col * 25 : (3 - col) * 25;
          
          const isClickable = level.status === "current" || level.status === "completed";

          return (
            <div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${xPosition + 12.5}%`,
                top: `${row * 120 + 60}px`,
              }}
            >
              {/* Connecting Line */}
              {index < levels.length - 1 && (
                <div
                  className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent"
                  style={{
                    width: "120px",
                    transform: `translateY(-50%) ${
                      (isEvenRow && col < 3) || (!isEvenRow && col > 0)
                        ? "translateX(10px)"
                        : "translateX(-130px)"
                    }`,
                  }}
                />
              )}

              {/* Level Node */}
              <button
                onClick={() => isClickable && onLevelClick(level)}
                disabled={!isClickable}
                className={`
                  relative w-20 h-20 rounded-full border-4 flex items-center justify-center
                  transition-all duration-300 font-bold text-lg
                  ${
                    level.status === "current"
                      ? "bg-primary border-primary-foreground shadow-lg scale-110 card-glow cursor-pointer hover:scale-125"
                      : level.status === "completed"
                      ? "bg-green-600 border-green-400 cursor-pointer hover:scale-110"
                      : "bg-muted border-border cursor-not-allowed opacity-50"
                  }
                `}
              >
                {level.status === "locked" && <Lock className="h-8 w-8" />}
                {level.status === "current" && <PlayCircle className="h-10 w-10" />}
                {level.status === "completed" && <CheckCircle2 className="h-10 w-10" />}

                {/* Level Number */}
                <div className="absolute -bottom-6 text-sm font-medium">
                  Level {level.id}
                </div>
              </button>

              {/* Current Level Indicator */}
              {level.status === "current" && (
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-3xl animate-float">
                  🚂
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Height spacer */}
      <div style={{ height: `${Math.ceil(levels.length / 4) * 120}px` }} />
    </div>
  );
}
