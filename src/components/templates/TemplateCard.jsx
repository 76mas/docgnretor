import { MoreHorizontal, Edit, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { useContext } from 'react';

export default function TemplateCard({ template, onUseTemplate, onEdit, onRename, onDelete }) {

  const navigate =useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="template-card" >

      <div className="template-type">{template.type}</div>
      
      <div className="template-preview">
        <div className="document-mockup">
          <div className="doc-header"></div>
          <div className="doc-line long"></div>
          <div className="doc-line medium"></div>
          <div className="doc-line short"></div>
          <div className="doc-line long"></div>
          <div className="doc-line medium"></div>
        </div>
      </div>
      
      <div className="template-info">
        <h3 className="template-name">{template.name}</h3>
        
        <div className="template-actions">
          <button className="use-btn" onClick={() =>  navigate("/formpage", { state: { template } })}>
            Use Template
          </button>
          
          <div className="menu-container">
            <button 
              className="menu-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal size={16} />
            </button>
            
            {showMenu && (
              <div className="action-menu">
                <button className="action-item" onClick={() => {
                  onEdit(template);
                  setShowMenu(false);
                }}>
                  <Edit size={14} />
                  Edit
                </button>
                <button className="action-item" onClick={() => {
                  onRename(template);
                  setShowMenu(false);
                }}>
                  <FileText size={14} />
                  Rename
                </button>
                <button className="action-item delete" onClick={() => {
                  onDelete(template);
                  setShowMenu(false);
                }}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}