import styles from './Header.module.css';
import { useState } from 'react';
import { Plus, User, LogOut } from 'lucide-react';
export default 
function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleCreateNew = () => {
    alert('Creating new template...');
  };

  const handleLogout = () => {
    alert('Logging out...');
    setShowUserMenu(false);
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