import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Bootstrap JS on client-side only
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="container mt-4">
          <Component {...pageProps} />
        </main>
        <footer className="container mt-5 py-3 text-center">
          <p>&copy; {new Date().getFullYear()} Pet Adoption Portal</p>
        </footer>
      </div>
    </AuthProvider>
  );
}
