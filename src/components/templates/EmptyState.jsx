import { useState } from "react";
import { useMenu } from "../context/Context";

import {saveTemplate} from "../services/templateService"
import PageEditor from "../editor/PageEditor"
import {  FileText } from 'lucide-react';
import FieldSidebar from '../../pages/EditorPage';







export default function EmptyState(){

  
  const [imgSrc, setImgSrc] = useState(null);
  const { showMenu, setShowMenu } = useMenu();
  const [viewMode, setViewMode] = useState('empty'); // 'empty' or 'with-templates'
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const selectedField = fields.find((f) => f.id === selectedId);

  const updateField = (updated) => {
    setFields(fields.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleSave = () => {
    if (!fields.length) {
      alert("لا توجد حقول للحفظ!");
      return;
    }
    const name = prompt("اكتب اسم القالب:");
    if (!name) return;
    saveTemplate(name, [
      {
        width: imgSrc ? 800 : 0,
        height: imgSrc ? 600 : 0,
        fields,
      },
    ]);
    alert("✅ تم حفظ القالب بنجاح");
  };

    return(    
    <div className="empty-state">

                      {imgSrc ? (
                  <div className='workspace'>


                  <div className='box-edit'>
                    <FieldSidebar field={selectedField} onUpdate={updateField} />
                    <button className="save-button" onClick={handleSave}>
                      <span>💾</span>
                      <span>حفظ القالب</span>
                    </button> 
                    
                    </div>
                     <PageEditor
                      bgSrc={imgSrc}
                      fields={fields}
                      setFields={setFields}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                    />
                  
                  </div>
                ) : (
                  <div className="editor-container">
                  <div className="empty-icon">
                            <FileText size={48} />
                        </div>
                          <h2 className="empty-title">You haven't created any templates yet.</h2>
                          <p className="empty-description">
                            Click the + Create New button to get started.
                          </p>
                  </div>
                )}
                      
                    </div>
                    
    )
}