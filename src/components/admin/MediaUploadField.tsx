'use client';

import React, { useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';

interface MediaUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  placeholder?: string;
}

export const MediaUploadField: React.FC<MediaUploadFieldProps> = ({
  label,
  value,
  onChange,
  accept = 'image/*,video/*',
  placeholder,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return (
      cleanUrl.endsWith('.mp4') ||
      cleanUrl.endsWith('.webm') ||
      cleanUrl.endsWith('.ogg') ||
      cleanUrl.endsWith('.mov') ||
      cleanUrl.includes('/videomenu/')
    );
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error al subir el archivo');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-1 block w-full">
      <span className="text-[10px] font-bold text-cream/45 uppercase tracking-widest block mb-1">
        {label}
      </span>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'URL o ruta local...'}
          className="flex-grow bg-black/40 border border-white/10 focus:border-primary text-cream px-4 py-2.5 text-xs focus:outline-none font-semibold transition-colors duration-300"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 bg-black/60 hover:bg-white/5 border border-white/10 text-cream text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin text-primary" />
          ) : (
            <Upload size={14} className="text-primary" />
          )}
          <span>{uploading ? 'Subiendo...' : 'Subir'}</span>
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {error && (
        <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wider mt-1">
          ⚠️ {error}
        </p>
      )}

      {value && (
        <div className="relative mt-2 border border-white/10 bg-black/40 overflow-hidden group max-w-sm rounded-none">
          {isVideoUrl(value) ? (
            <video
              src={value}
              controls
              muted
              loop
              playsInline
              className="w-full h-auto max-h-40 object-cover"
            />
          ) : (
            <img
              src={value}
              alt={label}
              className="w-full h-auto max-h-40 object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="absolute top-2 right-2">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-black/80 hover:bg-red-600 border border-white/10 text-cream hover:text-white transition-colors cursor-pointer"
              title="Eliminar archivo"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
