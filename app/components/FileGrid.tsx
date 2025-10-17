import { Star, MoreVertical, Download, Trash2, Share2, Video, FileText, Archive } from 'lucide-react';
import { Asset } from '../types';
import { useState } from 'react';

interface FileGridProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

export default function FileGrid({
  assets,
  selectedAssets,
  onToggleStar,
  onDelete,
  onToggleSelect
}: FileGridProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getIcon = (type: Asset['type']) => {
    switch (type) {
      case 'video':
        return Video;
      case 'document':
        return FileText;
      case 'archive':
        return Archive;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: Asset['type']) => {
    switch (type) {
      case 'video':
        return 'bg-purple-100 text-purple-600';
      case 'image':
        return 'bg-blue-100 text-blue-600';
      case 'document':
        return 'bg-orange-100 text-orange-600';
      case 'archive':
        return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {assets.map((asset) => {
        const Icon = getIcon(asset.type);
        const isSelected = selectedAssets.has(asset.id);

        return (
          <div
            key={asset.id}
            onClick={() => onToggleSelect(asset.id)}
            className={`group bg-white rounded-xl border-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              {asset.type === 'video' || asset.type === 'image' ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <Icon className="w-12 h-12 text-gray-400" />
                </div>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${getTypeColor(asset.type)}`}>
                  <Icon className="w-12 h-12" />
                </div>
              )}

              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(asset.id);
                  }}
                  className="p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${
                      asset.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                    }`}
                  />
                </button>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === asset.id ? null : asset.id);
                    }}
                    className="p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>

                  {openMenuId === asset.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(asset.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {asset.type === 'video' && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                  4:32
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
              <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                <span>{asset.size}</span>
                <span>{asset.modified}</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-gray-500">{asset.folder}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
