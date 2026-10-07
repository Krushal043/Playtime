'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Trash2, Plus, Loader2, Images } from 'lucide-react';

interface CloudinaryMultiImageUploadProps {
  label: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  helperText?: string;
}

export default function CloudinaryMultiImageUpload({
  label,
  urls,
  onChange,
  folder = 'playtime/products',
  helperText,
}: CloudinaryMultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploading(true);
    setUploadCount(0);
    setTotalCount(fileArray.length);

    const newUrls: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        formData.append('resource_type', 'image');

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error('Failed to upload image:', file.name, err);
      }
      setUploadCount(i + 1);
    }

    if (newUrls.length > 0) {
      onChange([...urls, ...newUrls]);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(urls.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <UploadCloud className="w-3 h-3" />
          <span>Cloudinary Multi-Upload</span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleUploadFiles(e.target.files)}
        className="hidden"
        disabled={isUploading}
      />

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {urls.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
          >
            <Image src={url} alt={`Gallery ${idx + 1}`} fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
              title="Remove image"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add more button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center p-2 text-slate-500 transition-colors cursor-pointer disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-900" />
              <span className="text-[10px] font-bold text-slate-700 mt-1">
                {uploadCount}/{totalCount}
              </span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold">Add Images</span>
            </>
          )}
        </button>
      </div>

      {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}
    </div>
  );
}
