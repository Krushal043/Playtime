'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Film,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  Loader2,
  FolderOpen,
  Play,
  X,
  FileVideo,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CloudinaryAsset {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  url: string;
  secure_url: string;
}

export default function CloudinaryMediaManager() {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFolder, setUploadFolder] = useState('playtime/products');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cloudinary?resource_type=${filterType}&max_results=60`);
      const data = await res.json();
      if (data.success && data.assets) {
        setAssets(data.assets);
      }
    } catch (err) {
      console.error('Failed to fetch Cloudinary assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [filterType]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (asset: CloudinaryAsset) => {
    if (!confirm(`Are you sure you want to delete this ${asset.resource_type} from Cloudinary?`)) return;

    setDeletingId(asset.public_id);
    try {
      const res = await fetch(
        `/api/admin/cloudinary?public_id=${encodeURIComponent(asset.public_id)}&resource_type=${asset.resource_type}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (data.success) {
        setAssets((prev) => prev.filter((a) => a.public_id !== asset.public_id));
      } else {
        alert(data.message || 'Failed to delete asset');
      }
    } catch (err: any) {
      alert(err.message || 'Deletion error');
    } finally {
      setDeletingId(null);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Step 1: Attempt direct upload to Cloudinary with progress
      let directSuccess = false;
      try {
        const signRes = await fetch(`/api/admin/upload?folder=${encodeURIComponent(uploadFolder)}`);
        const signData = await signRes.json();

        if (signData.success && signData.signature) {
          const actualResourceType = file.type.startsWith('video/') ? 'video' : 'image';
          const cloudName = signData.cloudName || 'xufcfdvu';
          const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${actualResourceType}/upload`;

          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', signData.apiKey);
          formData.append('timestamp', signData.timestamp.toString());
          formData.append('signature', signData.signature);
          formData.append('folder', signData.folder);

          await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', uploadUrl);

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                setUploadProgress(Math.round((e.loaded / e.total) * 100));
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                directSuccess = true;
                resolve();
              } else {
                reject(new Error('Cloudinary direct upload failed'));
              }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.send(formData);
          });
        }
      } catch (err) {
        console.warn('Direct upload error, falling back to server upload route:', err);
      }

      // Step 2: Fallback to server route if direct upload failed
      if (!directSuccess) {
        const fallbackData = new FormData();
        fallbackData.append('file', file);
        fallbackData.append('folder', uploadFolder);
        fallbackData.append('resource_type', file.type.startsWith('video/') ? 'video' : 'image');

        const serverRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: fallbackData,
        });

        const serverData = await serverRes.json();
        if (!serverData.success) {
          throw new Error(serverData.message || 'Upload failed');
        }
      }

      await fetchAssets();
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadError(error.message || 'Failed to upload media to Cloudinary');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredAssets = assets.filter((asset) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        asset.public_id.toLowerCase().includes(q) ||
        asset.format?.toLowerCase().includes(q) ||
        asset.resource_type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with Cloudinary Info */}
      <div className="bg-gradient-to-r from-[#051336] via-[#092257] to-[#1e1b4b] rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
            <span className="text-xs text-blue-200">Cloud Name: <strong className="text-white font-mono">xufcfdvu</strong></span>
          </div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
            <UploadCloud className="w-6 h-6 text-blue-400" />
            Cloudinary Media Storage
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Centralized high-performance media storage &amp; global CDN delivery for product catalog images, 4K demo videos, and creator video reels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-300">Total Cloud Assets</p>
            <p className="text-xl font-black text-white">{assets.length}</p>
          </div>
          <button
            onClick={fetchAssets}
            disabled={loading}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all cursor-pointer border border-white/15 disabled:opacity-50"
            title="Refresh assets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-[#051336] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Quick Upload to Cloudinary
            </h3>
            <p className="text-xs text-slate-500">Upload images or videos directly to Cloudinary folder</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Destination:</span>
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 font-mono text-xs font-semibold bg-slate-50 text-slate-700"
            >
              <option value="playtime/products">playtime/products</option>
              <option value="playtime/videos">playtime/videos</option>
              <option value="playtime/reels">playtime/reels</option>
              <option value="playtime/creators">playtime/creators</option>
              <option value="playtime/banners">playtime/banners</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) uploadFile(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-600 bg-blue-50/60 scale-[1.01]'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
            className="hidden"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-blue-900">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-rose-600" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {isUploading ? (
                  <span>Uploading to Cloudinary CDN ({uploadProgress}%)...</span>
                ) : (
                  <span>
                    Click to upload or drag &amp; drop <strong className="text-blue-900">Images or Videos</strong>
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Supports MP4, WebM, MOV, JPG, PNG, WEBP, AVIF with automatic CDN optimization
              </p>
            </div>
          </div>

          {/* Progress bar */}
          {isUploading && (
            <div className="mt-4 max-w-md mx-auto">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-700 to-rose-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {uploadError && (
          <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-xl border border-rose-200">
            {uploadError}
          </p>
        )}
      </div>

      {/* Asset Browser & Filters */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Assets ({assets.length})
            </button>
            <button
              onClick={() => setFilterType('image')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                filterType === 'image'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Images</span>
            </button>
            <button
              onClick={() => setFilterType('video')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                filterType === 'video'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-rose-600" />
              <span>Videos</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-900/20"
            />
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-900 mb-2" />
            <p className="text-xs font-bold">Loading Cloudinary media assets...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-600">No media assets found</p>
            <p className="text-xs text-slate-400 mt-1">Upload your first image or video above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAssets.map((asset) => {
              const isVid = asset.resource_type === 'video';
              const isDeleting = deletingId === asset.public_id;

              return (
                <div
                  key={asset.asset_id || asset.public_id}
                  className="group relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-slate-300"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-square bg-slate-900 overflow-hidden">
                    {isVid ? (
                      <div
                        onClick={() => setPreviewVideoUrl(asset.secure_url)}
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative group/vid"
                      >
                        <video
                          src={asset.secure_url}
                          className="w-full h-full object-cover opacity-80 group-hover/vid:opacity-100 transition-opacity"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/vid:bg-black/20 transition-all">
                          <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-900 group-hover/vid:scale-110 transition-transform">
                            <Play className="w-4 h-4 ml-0.5 fill-slate-900" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={asset.secure_url}
                        alt={asset.public_id}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    )}

                    {/* Format Badge */}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                      {asset.format || (isVid ? 'video' : 'img')}
                    </span>

                    {/* Duration badge if video */}
                    {isVid && asset.duration && (
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white">
                        {Math.round(asset.duration)}s
                      </span>
                    )}

                    {/* Quick Copy on Hover */}
                    <button
                      onClick={() => handleCopy(asset.secure_url)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Copy CDN URL"
                    >
                      {copiedUrl === asset.secure_url ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Metadata and Actions */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <p className="text-[11px] font-bold text-slate-700 truncate" title={asset.public_id}>
                        {asset.public_id.split('/').pop()}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>{formatBytes(asset.bytes)}</span>
                        {asset.width && asset.height && (
                          <span>{asset.width}x{asset.height}</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-1">
                      <button
                        onClick={() => handleCopy(asset.secure_url)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          copiedUrl === asset.secure_url
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {copiedUrl === asset.secure_url ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        <a
                          href={asset.secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-blue-600 rounded-md"
                          title="Open original"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleDelete(asset)}
                          disabled={isDeleting}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer disabled:opacity-50"
                          title="Delete from Cloudinary"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-3 h-3 animate-spin text-rose-600" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative bg-black rounded-3xl overflow-hidden max-w-2xl w-full border border-white/20 shadow-2xl">
            <button
              onClick={() => setPreviewVideoUrl(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <video src={previewVideoUrl} controls autoPlay playsInline className="w-full aspect-video object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
