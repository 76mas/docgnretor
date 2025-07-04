// app/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from '../components/context/Context';
import LoginPage    from '../pages/LoginPage';
import Dashboard    from '../pages/Dashboard';
import EditorPage   from '../pages/EditorPage';
import FormPage from '../components/templates/FormPage';

export default function App() {
  return (
    <BrowserRouter>
    <MenuProvider>
      <Routes>
        <Route path="/"          element={<LoginPage />} />
        <Route path="/home"      element={<Dashboard />} />
        <Route path="/editor"    element={<EditorPage />} />
         <Route path="/formpage" element={<FormPage />} />

      </Routes>
      </MenuProvider>
    </BrowserRouter>
  );
}
