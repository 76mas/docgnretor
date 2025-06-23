
import TemplateCard from "./TemplateCard";
import Swal from 'sweetalert2';


  const sampleTemplates = [

    { id: 1, type: 'Employment Contract', name: 'Employee Agreement' },
    { id: 2, type: 'Invoice', name: 'Service Invoice' },
    { id: 3, type: 'Report', name: 'Monthly Report' },
    { id: 4, type: 'Letter', name: 'Business Letter' },
    { id: 5, type: 'Contract', name: 'Service Contract' },
    { id: 6, type: 'Proposal', name: 'Project Proposal' }
  ];



export default function TemplateGrid(){

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


    return(     
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
                  
                )
}