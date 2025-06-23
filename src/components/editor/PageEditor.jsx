import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KImage, Rect, Transformer } from "react-konva";
import useImage from "use-image";

export default function PageEditor({ bgSrc, fields, setFields, selectedId, setSelectedId }) {
  const [image] = useImage(bgSrc);
  const [scale, setScale] = useState(1);     // نتحكّم بالحجم هنا
  const trRef = useRef();
  const stageRef = useRef();

  // أول ما تتحمّل الصورة نحسب الـscale
  useEffect(() => {
    if (image) {
      const MAX_WIDTH = 800;                 // العرض اللي تريده
      const s = image.width > MAX_WIDTH ? MAX_WIDTH / image.width : 1;
      setScale(s);
    }
  }, [image]);

  /*  ... كود الـselectedId نفسه ...  */

  const addField = (e) => {
    // لازم نقسم الإحداثيات على الـscale حتى تنحفظ صح
    const pos = e.target.getStage().getPointerPosition();
    const newField = {
      id: crypto.randomUUID(),
      x: pos.x / scale,
      y: pos.y / scale,
      width: 100,
      height: 30,
      name: "حقل جديد",
      type: "text",
    };
    setFields([...fields, newField]);
  };

  return (
    <Stage
      ref={stageRef}
      scaleX={scale}
      scaleY={scale}
      width={image ? image.width * scale : 800}
      height={image ? image.height * scale : 600}
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
            /* onDragEnd و onTransformEnd مثل ما هي */
          />
        ))}
        <Transformer ref={trRef} rotateEnabled={false} />
      </Layer>
    </Stage>
  );
}
