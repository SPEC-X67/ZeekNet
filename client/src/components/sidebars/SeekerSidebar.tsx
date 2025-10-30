import { LayoutDashboard, FileText, User, Settings as SettingsIcon, HelpCircle, LogOut, Bookmark } from 'lucide-react';

type Page = 'dashboard' | 'profile' | 'applications' | 'settings';

interface SeekerSidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const menuItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard, count: null },
  { id: 'applications' as Page, label: 'My Applications', icon: FileText, count: 12 },
  { id: 'profile' as Page, label: 'My Public Profile', icon: User, count: null },
];

const quickActions = [
  { id: 'saved', label: 'Saved Jobs', icon: Bookmark, count: 8 }
];

export function SeekerSidebar({ currentPage, onNavigate }: SeekerSidebarProps) {
  return (
    <div className="bg-gradient-to-b from-white to-[#f8f9ff] w-[240px] h-full flex flex-col border-r border-[#e5e7eb] shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center overflow-hidden">
            <img src="/blue.png" alt="ZeekNet Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-[20px] text-[#1f2937] leading-tight">
              ZeekNet
            </h1>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 px-3">
              Main Menu
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#4640de] to-[#6366f1] text-white shadow-lg shadow-[#4640de]/25'
                        : 'text-[#374151] hover:bg-[#f3f4f6] hover:text-[#1f2937]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#6b7280] group-hover:text-[#4640de]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className={`text-[12px] px-2 py-1 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-[#e5e7eb] text-[#6b7280] group-hover:bg-[#4640de] group-hover:text-white'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 px-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-medium text-[#374151] hover:bg-[#f3f4f6] hover:text-[#1f2937] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-5 h-5 text-[#6b7280] group-hover:text-[#4640de]" />
                    <span>{action.label}</span>
                  </div>
                  {action.count && (
                    <span className="text-[12px] px-2 py-1 rounded-full bg-[#e5e7eb] text-[#6b7280] group-hover:bg-[#4640de] group-hover:text-white">
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 px-3">
              Account
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate('settings')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group ${
                  currentPage === 'settings'
                    ? 'bg-gradient-to-r from-[#4640de] to-[#6366f1] text-white shadow-lg shadow-[#4640de]/25'
                    : 'text-[#374151] hover:bg-[#f3f4f6] hover:text-[#1f2937]'
                }`}
              >
                <SettingsIcon className={`w-5 h-5 ${currentPage === 'settings' ? 'text-white' : 'text-[#6b7280] group-hover:text-[#4640de]'}`} />
                <span>Settings</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-[#374151] hover:bg-[#f3f4f6] hover:text-[#1f2937] transition-all duration-200 group">
                <HelpCircle className="w-5 h-5 text-[#6b7280] group-hover:text-[#4640de]" />
                <span>Help Center</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-[#e5e7eb] bg-gradient-to-r from-[#f8f9ff] to-white flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <img src="https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-103130.jpg" alt="Google Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[14px] text-[#1f2937] leading-tight truncate">
              Jake Gyll
            </p>
            <p className="text-[12px] text-[#6b7280] truncate">
              jakegyll@email.com
            </p>
          </div>
          <button className="p-2 text-[#6b7280] hover:text-[#ef4444] hover:bg-red-50 rounded-lg transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
}

export default SeekerSidebar;
