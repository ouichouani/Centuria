import "./globals.css";
import AppProvider  from "@/context/AppContext.jsx";
import NavProvider  from "@/context/NavContext.jsx";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (

    <html lang="en">

      <AppProvider>
        <NavProvider>
        {children}
        </NavProvider>
      </AppProvider>
      
    </html>
  );
}
