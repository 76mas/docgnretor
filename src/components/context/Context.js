// MenuContext.js
import { createContext, useContext, useState } from "react";

// نعرّف الكونتكست
export const MenuContext = createContext(null);

// نكتب الـ Provider
export function MenuProvider({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  const value = { showMenu, setShowMenu }; // نبعثها للعيال

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

// هوك صغير يخليك توصل للكونتكست بسهولة
export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu لازم تناديه داخل <MenuProvider>");
  return ctx;
}
