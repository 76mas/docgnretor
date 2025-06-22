import { useState } from 'react';
import { Plus, User, LogOut, MoreHorizontal, Edit, FileText, Trash2 } from 'lucide-react';
import TemplateCard from '../components/templates/TemplateCard';
import Header from '../components/layout/Header';
import Swal from 'sweetalert2';
import { useMenu } from "../components/context/Context";

// Header Component

// Template Card Component


// Main Dashboard Component
export default function Dashboard() {
  const { showMenu, setShowMenu } = useMenu();

  const [viewMode, setViewMode] = useState('empty'); // 'empty' or 'with-templates'
  
  const sampleTemplates = [
    { id: 1, type: 'Employment Contract', name: 'Employee Agreement' },
    { id: 2, type: 'Invoice', name: 'Service Invoice' },
    { id: 3, type: 'Report', name: 'Monthly Report' },
    { id: 4, type: 'Letter', name: 'Business Letter' },
    { id: 5, type: 'Contract', name: 'Service Contract' },
    { id: 6, type: 'Proposal', name: 'Project Proposal' }
  ];

  const handleUseTemplate = (template) => {
    alert(`Using template: ${template.name}`);
  };

  const handleEdit = (template) => {
    alert(`Editing template: ${template.name}`);
  };

  const handleRename = (template) => {
    const newName = prompt('Enter new name:', template.name);
    if (newName) {
      alert(`Renamed to: ${newName}`);
    }
  };

  const handleDelete = (template) => {
  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: `راح تحذف "${template.name}"`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم، احذف',
    cancelButtonText: 'إلغاء',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('تم الحذف!', `تم حذف "${template.name}".`, 'success');
      // هنا تحذف فعليًا من البيانات
    }
  });
};

  return (
    <>
      <Header />
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
                <div className="empty-icon">
                  <FileText size={48} />
                </div>
                <h2 className="empty-title">You haven't created any templates yet.</h2>
                <p className="empty-description">
                  Click the + Create New button to get started.
                </p>
              </div>
            ) : (
              <div className="templates-grid">

                {sampleTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onUseTemplate={handleUseTemplate}
                    onEdit={handleEdit}
                    onRename={handleRename}
                    onDelete={handleDelete}
                  />
                ))}

              </div>
            )}
          </div>
        </div>
      </main>


    </>
  );
}