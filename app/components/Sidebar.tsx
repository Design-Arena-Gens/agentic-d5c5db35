import { Home, Star, Video, Image, Folder, Users, Settings } from 'lucide-react';
import { FilterType } from '../types';

interface SidebarProps {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
}

export default function Sidebar({ filterType, setFilterType }: SidebarProps) {
  const menuItems = [
    { id: 'all' as FilterType, icon: Home, label: 'All Files', color: 'text-gray-600' },
    { id: 'starred' as FilterType, icon: Star, label: 'Starred', color: 'text-yellow-600' },
    { id: 'video' as FilterType, icon: Video, label: 'Videos', color: 'text-purple-600' },
    { id: 'image' as FilterType, icon: Image, label: 'Images', color: 'text-blue-600' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Air</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = filterType === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setFilterType(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : item.color}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Folders
          </h3>
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
              <Folder className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Campaigns</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
              <Folder className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Brand Assets</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
              <Folder className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Social Media</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-gray-200 space-y-1">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Team</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}
