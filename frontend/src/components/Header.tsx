import { Database, RefreshCw } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-[#E8E4DE] bg-[#FAFAF8]">

      <h1 className="text-4xl font-bold text-[#8A5A14]">
        Overview
      </h1>

      <div className="flex gap-4">

        <div className="flex items-center gap-2 rounded-lg border border-[#E8E4DE] bg-white px-4 py-2">
          <Database size={18} className="text-[#6B6560]" />
          <span className="text-sm text-[#6B6560]">
            Dataset: 22 Indian Cities
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#E8E4DE] bg-white px-4 py-2">
          <RefreshCw size={18} className="text-[#6B6560]" />
          <span className="text-sm text-[#6B6560]">
            Last Updated: June 2026
          </span>
        </div>

      </div>

    </header>
  );
}

export default Header;