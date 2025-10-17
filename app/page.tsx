'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FileGrid from './components/FileGrid';
import FileList from './components/FileList';
import UploadModal from './components/UploadModal';
import { Asset, ViewMode, FilterType } from './types';

const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Summer Campaign 2024.mp4',
    type: 'video',
    size: '124 MB',
    modified: '2 hours ago',
    thumbnail: '/api/placeholder/300/200',
    starred: true,
    folder: 'Campaigns'
  },
  {
    id: '2',
    name: 'Product Hero Image.jpg',
    type: 'image',
    size: '2.4 MB',
    modified: 'Yesterday',
    thumbnail: '/api/placeholder/300/200',
    starred: false,
    folder: 'Product Assets'
  },
  {
    id: '3',
    name: 'Brand Guidelines Q1.pdf',
    type: 'document',
    size: '8.1 MB',
    modified: '3 days ago',
    thumbnail: '/api/placeholder/300/200',
    starred: true,
    folder: 'Brand'
  },
  {
    id: '4',
    name: 'Instagram Story Ad.mp4',
    type: 'video',
    size: '45 MB',
    modified: '1 week ago',
    thumbnail: '/api/placeholder/300/200',
    starred: false,
    folder: 'Social Media'
  },
  {
    id: '5',
    name: 'Logo Variations.zip',
    type: 'archive',
    size: '12 MB',
    modified: '2 weeks ago',
    thumbnail: '/api/placeholder/300/200',
    starred: false,
    folder: 'Brand'
  },
  {
    id: '6',
    name: 'Fall Collection Banner.png',
    type: 'image',
    size: '5.6 MB',
    modified: '3 weeks ago',
    thumbnail: '/api/placeholder/300/200',
    starred: true,
    folder: 'Campaigns'
  }
];

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'starred' && asset.starred) ||
                         (filterType === 'video' && asset.type === 'video') ||
                         (filterType === 'image' && asset.type === 'image');
    return matchesSearch && matchesFilter;
  });

  const toggleStar = (id: string) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, starred: !asset.starred } : asset
    ));
  };

  const deleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    selectedAssets.delete(id);
    setSelectedAssets(new Set(selectedAssets));
  };

  const toggleSelectAsset = (id: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAssets(newSelected);
  };

  const handleUpload = (files: File[]) => {
    const newAssets: Asset[] = files.map((file, index) => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      let type: Asset['type'] = 'document';

      if (isVideo) type = 'video';
      else if (isImage) type = 'image';
      else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) type = 'archive';

      return {
        id: `${Date.now()}-${index}`,
        name: file.name,
        type,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        modified: 'Just now',
        thumbnail: '/api/placeholder/300/200',
        starred: false,
        folder: 'My Files'
      };
    });

    setAssets([...newAssets, ...assets]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar filterType={filterType} setFilterType={setFilterType} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {filterType === 'all' && 'All Files'}
              {filterType === 'starred' && 'Starred'}
              {filterType === 'video' && 'Videos'}
              {filterType === 'image' && 'Images'}
            </h1>
            <span className="text-sm text-gray-500">
              {filteredAssets.length} {filteredAssets.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {viewMode === 'grid' ? (
            <FileGrid
              assets={filteredAssets}
              selectedAssets={selectedAssets}
              onToggleStar={toggleStar}
              onDelete={deleteAsset}
              onToggleSelect={toggleSelectAsset}
            />
          ) : (
            <FileList
              assets={filteredAssets}
              selectedAssets={selectedAssets}
              onToggleStar={toggleStar}
              onDelete={deleteAsset}
              onToggleSelect={toggleSelectAsset}
            />
          )}
        </main>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
