import { useState } from 'react';
import {saveTemplate} from "../components/services/templateService"
import PageEditor from "../components/editor/PageEditor"
import { FileText } from 'lucide-react';
import FieldSidebar from './FieldSidebar';
// import TemplateCard from '../components/templates/TemplateCard';
import TemplateGrid from '../components/templates/TemplateGrid';
import Header from '../components/layout/Header';
// import Swal from 'sweetalert2';
// import { useMenu } from "../components/context/Context";

// import EmptyState from '../components/templates/EmptyState';

// Header Component

// Template Card Component


// Main Dashboard Component
export default function Dashboard() {

  
  const [imgSrc, setImgSrc] = useState(null);
  // const { showMenu, setShowMenu } = useMenu();
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
         image: imgSrc,             // صورة الخلفية بصيغة base64 من pdfToImage
          fields,                   // الحقول المضافة للقالب
          width: imgSrc ? 800 : 0,
          height: imgSrc ? 600 : 0,
           },
    ]);
    alert("✅ تم حفظ القالب بنجاح");
  };





  return (
    <>
      <Header onImageReady={setImgSrc}  />


      <main className="main-content"   >
        <div className="container" >
          <div className="page-header">
      
            
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'empty' ? 'active' : ''}`}
                onClick={() => setViewMode('empty')}
              >
                Empty State
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'with-templates' ? 'active' : ''}`}
                onClick={() => setViewMode('with-templates')}
              >
                With Templates
              </button>
            </div>

                  <h1 className="page-title">My Templates</h1>
          </div>

          <div className="content-area">
            {viewMode === 'empty' ? (


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
              // <EmptyState />
                  ) : (
              <TemplateGrid/>
            )}
          </div>
        </div>
      </main>


    </>
  );
}