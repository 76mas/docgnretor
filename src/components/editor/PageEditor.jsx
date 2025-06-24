import React, { useState, useRef, useEffect } from "react";


import { Stage, Layer, Image as KImage, Rect, Transformer ,Group, Text } from "react-konva";
import useImage from "use-image";

export default function PageEditor({ bgSrc, fields, setFields, selectedId, setSelectedId }) {
  const [image] = useImage(bgSrc);
  const [scale, setScale] = useState(1);     // نتحكّم بالحجم هنا
  const trRef = useRef();
  const stageRef = useRef();



// PageEditor.jsx (قبل الـ return)
const updateFieldPosSize = (updated) => {
  // لازم ترجع مصفوفة جديدة حتى React يعيد الرندر
  setFields((prev) =>
    prev.map((f) => (f.id === updated.id ? updated : f))
  );
  setSelectedId(updated.id);   // يبقى البوكس نفسه محدّد
};




  // أول ما تتحمّل الصورة نحسب الـscale
 useEffect(() => {
  if (!trRef.current || !stageRef.current) return;
  const selectedNode = stageRef.current.findOne(`#${selectedId}`);
  if (selectedNode) {
    trRef.current.nodes([selectedNode]);
    trRef.current.getLayer().batchDraw();
  }
}, [selectedId, fields]);   // يعيد الربط كل ما تغيّر


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
        value: "",        
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
    draggable
    stroke={f.id === selectedId ? "#007bff" : "#dc3545"}
    onClick={() => setSelectedId(f.id)}
    
    /* ← هنا التحديثات */
    onDragEnd={(e) => {
      const node = e.target;
      updateFieldPosSize({
        ...f,
        x: node.x() / scale,
        y: node.y() / scale,
      });
    }}
    
    onTransformEnd={(e) => {
      const node   = e.target;
      const sx     = node.scaleX();
      const sy     = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);

      updateFieldPosSize({
        ...f,
        x: node.x() / scale,
        y: node.y() / scale,
        width:  node.width()  * sx,
        height: node.height() * sy,
      });
    }}
  />
))}

        <Transformer ref={trRef} rotateEnabled={false} />
      </Layer>
    </Stage>
  );
}
