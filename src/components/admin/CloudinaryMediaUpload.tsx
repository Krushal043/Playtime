'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Check, Copy, Trash2, Film, Image as ImageIcon, Loader2, ExternalLink } from 'lucide-react';

interface CloudinaryMediaUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  resourceType?: 'image' | 'video' | 'auto';
  folder?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export default function CloudinaryMediaUpload({
  label,
  value,
  onChange,
  resourceType = 'auto',
  folder = 'playtime',
  placeholder = 'https://res.cloudinary.com/... or paste any URL',
  helperText,
  required = false,
}: CloudinaryMediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo =
    resourceType === 'video' ||
    (value && (value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov') || value.includes('/video/upload/')));

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChange('');
    setErrorMessage(null);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);

    try {
      // Step 1: Request signature for direct upload to Cloudinary (bypasses server payload limits for 4K/videos)
      const targetFolder = folder || (resourceType === 'video' ? 'playtime/videos' : 'playtime/images');
      let directUploadSuccess = false;

      try {
        const signRes = await fetch(`/api/admin/upload?folder=${encodeURIComponent(targetFolder)}`);
        const signData = await signRes.json();

        if (signData.success && signData.signature) {
          const actualResourceType = resourceType === 'video' || file.type.startsWith('video/') ? 'video' : 'image';
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

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percent);
              }
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                if (response.secure_url) {
                  onChange(response.secure_url);
                  directUploadSuccess = true;
                  resolve();
                } else {
                  reject(new Error('No secure_url in Cloudinary response'));
                }
              } else {
                reject(new Error(`Cloudinary upload failed: ${xhr.statusText || xhr.status}`));
              }
            };

            xhr.onerror = () => reject(new Error('Network error during Cloudinary upload'));
            xhr.send(formData);
          });
        }
      } catch (err) {
        console.warn('Direct upload error, falling back to server upload route:', err);
      }

      // Step 2: Fallback to server route if direct upload was skipped or failed
      if (!directUploadSuccess) {
        const fallbackFormData = new FormData();
        fallbackFormData.append('file', file);
        fallbackFormData.append('folder', targetFolder);
        fallbackFormData.append('resource_type', resourceType);

        const serverRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: fallbackFormData,
        });

        const serverData = await serverRes.json();
        if (serverData.success && serverData.url) {
          onChange(serverData.url);
        } else {
          throw new Error(serverData.message || 'Upload failed');
        }
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      setErrorMessage(error.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const acceptAttribute =
    resourceType === 'video'
      ? 'video/mp4,video/webm,video/quicktime,video/x-m4v'
      : resourceType === 'image'
      ? 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif'
      : 'image/*,video/*';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <UploadCloud className="w-3 h-3" />
          <span>Cloudinary CDN</span>
        </div>
      </div>

      {/* Main input & Action Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#051336]/20 focus:border-[#051336] transition-all bg-white"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttribute}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-2 bg-gradient-to-r from-[#051336] to-blue-900 hover:from-blue-950 hover:to-indigo-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
          title="Upload to Cloudinary"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{uploadProgress > 0 ? `${uploadProgress}%` : 'Uploading...'}</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload</span>
            </>
          )}
        </button>

        {value && (
          <>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Remove media"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Progress Bar when uploading */}
      {isUploading && (
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 transition-all duration-300 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
      )}

      {/* Drag & Drop Hint if empty */}
      {!value && !isUploading && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
          }`}
        >
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Drag &amp; drop {resourceType === 'video' ? 'video' : resourceType === 'image' ? 'image' : 'media'} or{' '}
              <strong className="text-blue-900 underline font-bold">browse from device</strong>
            </span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Directly stored on Cloudinary CDN</p>
        </div>
      )}

      {/* Preview if URL exists */}
      {value && (
        <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
          {isVideo ? (
            <div className="space-y-1.5">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-video max-h-40 border border-slate-300">
                <video src={value} controls playsInline className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span className="flex items-center gap-1">
                  <Film className="w-3 h-3 text-rose-600" />
                  Video Stream Ready
                </span>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-blue-600"
                >
                  Open in New Tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-300">
                  <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-emerald-600" />
                    Image Ready
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{value}</p>
                </div>
              </div>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}
    </div>
  );
}
