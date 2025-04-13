// Whiteboard.tsx
import { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

type Point = number[];
type LineType = { tool: string; points: Point[] };

const Whiteboard = () => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [history, setHistory] = useState<LineType[][]>([]);
  const [redoStack, setRedoStack] = useState<LineType[][]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: "pen", points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    if (!lastLine) return;

    const newLines = [...lines];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    newLines.splice(lines.length - 1, 1, lastLine);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setHistory([...history, lines]);
  };

  const undo = () => {
    if (lines.length === 0) return;
    setRedoStack([...redoStack, lines]);
    const prev = history[history.length - 1];
    if (prev) {
      setLines(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    setLines(last);
    setHistory([...history, last]);
    setRedoStack(redoStack.slice(0, -1));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> Draw Something!</h2>

      <div className="shadow p-3 mb-4 bg-white rounded">
        <div className="canvas-wrapper mb-3" style={{ overflowX: "auto" }}>
          <Stage
            width={600}
            height={400}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            style={{
              border: "2px solid #333",
              borderRadius: "10px",
              background: "#fff",
              display: "block",
              margin: "auto",
            }}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points.flat()}
                  stroke="#000"
                  strokeWidth={3}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation="source-over"
                />
              ))}
            </Layer>
          </Stage>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary" onClick={undo}>Undo</button>
          <button className="btn btn-outline-danger" onClick={redo}>Redo</button>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
