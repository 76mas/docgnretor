import styles from "./Header.module.css";
import React from "react";

import { Plus, User, LogOut } from "lucide-react";
import { useRef } from "react";
import { pdfToImage } from "../services/pdfService";
import {MenuContext} from "../context/Context"
import { useContext,useState } from "react";

export default function Header({onImageReady}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

const {selectedFile, setSelectedFile} = useContext(MenuContext);



  const handleLogout = () => {
    alert("Logging out...");
    setShowUserMenu(false);
  };

  const fileInputRef = useRef(null);

  const handleCreateNew = () => {
    fileInputRef.current.click(); // تفعيل ضغط مخفي على input type=file
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const img = await pdfToImage(arrayBuffer);
       onImageReady(img);
       console.log(file);
      alert(`تم اختيار الملف: ${file.name}`);
      // هنا تقدر تسوي upload أو أي منطق ثاني
    }
  };


  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="brand-name">NOVA DEVSPRINT</div>
          <div className="project-name">Document Generator</div>
        </div>

        <div className="header-actions">
          <button className="create-btn" onClick={handleCreateNew}>
            <Plus size={16} />
            Create New
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="user-menu-container">
            <button
              className="user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User size={18} />
            </button>

            {showUserMenu && (
              <div className="user-menu">
                <button className="menu-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}





// import React, { useRef, useState } from "react";
// import { Plus } from "lucide-react";
// import { Stage, Layer, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";
// import { pdfToImage } from "../services/pdfService";

// function CanvasImage({ src }) {
//   const [image] = useImage(src);
//   return image ? (
//     <KonvaImage
//       image={image}
//       draggable          // تسحبها بالماوس
//       x={0}
//       y={0}
//       width={image.width}
//       height={image.height}
//     />
//   ) : null;
// }

// export default function Header() {
//   const fileInputRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState(null);   // نحفظ الصورة هنا

//   const handleCreateNew = () => fileInputRef.current.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // تحوّل PDF إلى صورة (dataURL أو blob)
//     const buffer = await file.arrayBuffer();
//     const dataUrl = await pdfToImage(buffer);   // لازم ترجع base64 أو ObjectURL
//     setImgSrc(dataUrl);
//   };

//   return (
//     <>
//       {/* الزرّ واختيار الملف */}
//       <button onClick={handleCreateNew}>
//         <Plus size={16} /> Create New
//       </button>
//       <input
//         type="file"
//         accept="application/pdf"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       {/* الـ Canvas */}
//       {imgSrc && (
//         <Stage width={800} height={1000}>
//           <Layer>
//             <CanvasImage src={imgSrc} />
//           </Layer>
//         </Stage>
//       )}
//     </>
//   );
// }


