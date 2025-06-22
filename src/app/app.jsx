// app/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage    from '../pages/LoginPage';
import Dashboard    from '../pages/Dashboard';
import EditorPage   from '../pages/EditorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LoginPage />} />
        <Route path="/home"      element={<Dashboard />} />
        <Route path="/editor"    element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
