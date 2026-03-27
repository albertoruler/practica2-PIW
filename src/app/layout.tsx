import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countries Explorer",
  description: "Descubre países, regiones y datos interesantes con estilo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_30%_40%,_rgba(59,130,246,0.16),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Countries Explorer
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a href="/" className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-950 transition hover:bg-white">
                    Inicio
                  </a>
                  <a href="/all" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10">
                    Todos los países
                  </a>
                </div>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
