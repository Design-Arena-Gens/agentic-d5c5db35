import { Search, Upload, Grid, List } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onUploadClick: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onUploadClick
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-6">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onUploadClick}
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </button>

          <div className="flex items-center space-x-2 ml-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
