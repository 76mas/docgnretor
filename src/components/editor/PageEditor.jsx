import React, { useRef, useEffect } from "react";
import { Stage, Layer, Image as KImage, Rect, Transformer } from "react-konva";
import useImage from "use-image";

export default function PageEditor({ bgSrc, fields, setFields, selectedId, setSelectedId }) {
  const [image] = useImage(bgSrc);
  const trRef = useRef();
  const stageRef = useRef();

  useEffect(() => {
    if (selectedId) {
      const node = stageRef.current.findOne(`#${selectedId}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  const addField = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    const newField = {
      id: crypto.randomUUID(),
      x: pos.x,
      y: pos.y,
      width: 100,
      height: 30,
      name: "حقل جديد",
      type: "text",
    };
    setFields([...fields, newField]);
  };

  return (
    <div className="editor-container">
      <Stage
        ref={stageRef}
        className="canvas-container"
        width={image?.width || 800}
        height={image?.height || 600}
        onDblClick={addField}
      >
        <Layer>
          {image && <KImage image={image} />}
          {fields.map((f) => (
            <Rect
              key={f.id}
              id={f.id}
              {...f}
              stroke={f.id === selectedId ? "#007bff" : "#dc3545"}
              draggable
              onClick={() => setSelectedId(f.id)}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                const updated = fields.map((x) =>
                  x.id === f.id
                    ? {
                        ...x,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                      }
                    : x
                );
                setFields(updated);
                node.scaleX(1);
                node.scaleY(1);
              }}
              onDragEnd={(e) => {
                const updated = fields.map((x) =>
                  x.id === f.id ? { ...x, x: e.target.x(), y: e.target.y() } : x
                );
                setFields(updated);
              }}
            />
          ))}
          <Transformer ref={trRef} rotateEnabled={false} />
        </Layer>
      </Stage>
    </div>
  );
}