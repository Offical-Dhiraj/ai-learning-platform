import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <h1 className="text-xl font-bold">AI Test</h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <Link to="/generate" className="hover:text-purple-400">Generate</Link>
          <Link to="/dashboard" className="hover:text-purple-400">Dashboard</Link>
        </div>

        {/* MOBILE ICON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-[#1e293b]">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/generate" onClick={() => setOpen(false)}>Generate</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
        </div>
      )}
    </nav>
  );
}