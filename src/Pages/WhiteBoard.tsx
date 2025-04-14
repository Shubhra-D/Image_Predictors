import { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

type Point = number[];
type LineType = { tool: string; points: Point[] };

interface WhiteboardProps {
  onPredictImage: (base64Image: string) => void;
}

const Whiteboard = ({ onPredictImage }: WhiteboardProps) => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [history, setHistory] = useState<LineType[][]>([]);
  const [redoStack, setRedoStack] = useState<LineType[][]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);

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

  const clearCanvas = () => {
    setLines([]);
    setHistory([]);
    setRedoStack([]);
  };

  const handlePredict = async () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    onPredictImage(uri); // Call parent component's prediction function
  };

  return (
    <div className="shadow p-3 mb-4 bg-white rounded">
      <Stage
        ref={stageRef}
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

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-secondary" onClick={undo}>Undo</button>
        <button className="btn btn-danger" onClick={redo}>Redo</button>
        <button className="btn btn-warning" onClick={clearCanvas}>Clear</button>
        <button className="btn btn-success" onClick={handlePredict}>Predict Drawing</button>
      </div>
    </div>
  );
};

export default Whiteboard;
