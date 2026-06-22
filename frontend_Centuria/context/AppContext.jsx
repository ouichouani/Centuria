"use client";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const AppContext = createContext({});

export default function AppProvider({ children }) {

  const domain = 'http://localhost:80/api';

  const [globalUser, setGlobalUser] = useState({});

  // avoid the error server : ReferenceError: localStorage is not defined
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return;

    try {
      setGlobalUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid user in localStorage:", storedUser);
      localStorage.removeItem("user");
    }
  }, []);

  const setUser = (item) => {
    localStorage.setItem('user', JSON.stringify(item));
    setGlobalUser((prev) => ({ ...prev, ...item }));
  }

  // TEMP NOTIFICATION GLOBAL STATE
  const [toastNotification, setToastNotification] = useState([]);

  // INSERT AN OBJECT IN THE TOAST STATE . IT NEES A MESSAGE
  function notify(message , color = 'green', duration = 3000) {

    const id = new Date().getTime();
    setToastNotification(prev => ([...prev, { removing: false, id: id, message : message , color : color }]));

    setTimeout(() => {

      setToastNotification(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, removing: true }
            : item
        )
      );

      setTimeout(() => {
        setToastNotification(prev => prev.filter(item => item.id != id));
      }, 500);

    }, duration);

  }

  const pathname = usePathname();

  let pagetitle = ''
  switch (true) {
    case pathname.includes("followers"): pagetitle = 'manage followers'; break
    case pathname.includes("following"): pagetitle = 'manage following'; break
    case pathname.includes("inbox"): pagetitle = 'manage requests'; break
    case pathname.includes("tasks"): pagetitle = 'manage tasks'; break
    case pathname.includes("habits"): pagetitle = 'manage habits'; break
    case pathname.includes("logs"): pagetitle = 'manage logs'; break
    case pathname.includes("profile"): pagetitle = 'manage profile'; break
    case pathname.includes("board"): pagetitle = 'traking board'; break
    case pathname.includes("categories"): pagetitle = 'manage categories'; break
    case pathname.includes("requests"): pagetitle = 'manage requests'; break
    case pathname.includes("history"): pagetitle = 'manage history'; break
    case pathname.includes("login"): pagetitle = 'login'; break
    case pathname.includes("explore"): pagetitle = 'explore'; break
    case pathname.includes("register"): pagetitle = 'register'; break
    case pathname.includes("controll-panel"): pagetitle = 'controll-panel'; break
    default: pagetitle = 'Centuria'; break
  }

  const sharedValues = {
    user: globalUser,
    setUser: setUser,
    domain: domain,
    pathname: pathname,
    pagetitle: pagetitle,
    toastNotification: toastNotification,
    notify : notify 
  }

  return (
    <AppContext.Provider value={{ ...sharedValues }} >
      {children}
    </AppContext.Provider>
  )
}