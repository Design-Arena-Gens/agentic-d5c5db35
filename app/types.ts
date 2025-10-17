export type Asset = {
  id: string;
  name: string;
  type: 'video' | 'image' | 'document' | 'archive';
  size: string;
  modified: string;
  thumbnail: string;
  starred: boolean;
  folder: string;
};

export type ViewMode = 'grid' | 'list';

export type FilterType = 'all' | 'starred' | 'video' | 'image';
