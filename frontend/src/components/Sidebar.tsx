import {
  BarChart3,
  LayoutDashboard,
  Building2,
  Sparkles,
  User,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-80 min-h-screen border-r border-[#E8E4DE] bg-white flex flex-col justify-between">

      {/* Logo */}
      <div>
        <div className="p-8">
          <div className="flex items-center gap-3">
            <BarChart3
              size={32}
              className="text-[#8A5A14]"
            />

            <div>
              <h1 className="text-3xl font-bold text-[#8A5A14]">
                MarketScope AI
              </h1>

              <p className="text-xs tracking-[0.3em] uppercase text-[#6B6560] mt-2">
                Expansion Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-8">

          <div className="flex items-center gap-3 bg-[#F5F3EF] border-l-4 border-[#C17F24] px-4 py-4 rounded-r-lg">
            <LayoutDashboard size={20} />
            <span className="font-medium">
              Market Intelligence
            </span>
          </div>

          <div className="flex items-center gap-3 px-4 py-4 mt-2 text-[#6B6560]">
            <Building2 size={20} />
            <span>Markets</span>
          </div>

        </nav>
      </div>

      {/* Bottom */}
      <div className="p-6 border-t border-[#E8E4DE]">

        <div className="flex items-center gap-3 text-[#A59C92] mb-8">
          <Sparkles size={18} />
          <span>AI Insights (Coming Soon)</span>
        </div>

        <div className="flex items-center gap-3">
          <User size={18} />

          <div>
            <p className="font-medium">
              Enterprise User
            </p>

            <p className="text-sm text-[#6B6560]">
              v2.4.1
            </p>
          </div>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;