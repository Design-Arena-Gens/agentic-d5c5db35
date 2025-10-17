import { Star, MoreVertical, Download, Trash2, Share2, Video, Image, FileText, Archive } from 'lucide-react';
import { Asset } from '../types';
import { useState } from 'react';

interface FileListProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

export default function FileList({
  assets,
  selectedAssets,
  onToggleStar,
  onDelete,
  onToggleSelect
}: FileListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getIcon = (type: Asset['type']) => {
    switch (type) {
      case 'video':
        return Video;
      case 'image':
        return Image;
      case 'document':
        return FileText;
      case 'archive':
        return Archive;
    }
  };

  const getTypeColor = (type: Asset['type']) => {
    switch (type) {
      case 'video':
        return 'text-purple-600';
      case 'image':
        return 'text-blue-600';
      case 'document':
        return 'text-orange-600';
      case 'archive':
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Folder</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Modified</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      <div className="divide-y divide-gray-200">
        {assets.map((asset) => {
          const Icon = getIcon(asset.type);
          const isSelected = selectedAssets.has(asset.id);

          return (
            <div
              key={asset.id}
              onClick={() => onToggleSelect(asset.id)}
              className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <div className="col-span-5 flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(asset.type)} bg-opacity-10`}>
                  <Icon className={`w-5 h-5 ${getTypeColor(asset.type)}`} />
                </div>
                <span className="font-medium text-gray-900 truncate">{asset.name}</span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{asset.folder}</span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{asset.size}</span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{asset.modified}</span>
              </div>

              <div className="col-span-1 flex items-center justify-end space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(asset.id);
                  }}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
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
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
