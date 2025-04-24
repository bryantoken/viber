import React from 'react';
import Image from 'next/image';

interface TrackItemProps {
  title: string;
  artist: string;
  album?: string;
  duration: number;
  coverImage?: string;
  order: number;
  url: string;
}

export default function TrackItem({
  title,
  artist,
  album,
  duration,
  coverImage,
  order,
  url
}: TrackItemProps) {
  // Formatar duração de segundos para minutos:segundos
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center p-3 hover:bg-dark-700 rounded-md transition-colors group">
      <div className="flex items-center justify-center w-8 text-gray-400 group-hover:text-white">
        <span className="group-hover:hidden">{order}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden group-hover:block" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </div>
      
      <div className="ml-4 flex-shrink-0 w-10 h-10 relative">
        {coverImage ? (
          <Image 
            src={coverImage} 
            alt={`${title} - ${artist}`}
            width={40}
            height={40}
            className="object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-dark-600 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="truncate">
            <p className="text-white font-medium truncate">{title}</p>
            <p className="text-gray-400 text-sm truncate">{artist}</p>
          </div>
          {album && (
            <p className="text-gray-400 text-sm truncate hidden md:block">{album}</p>
          )}
        </div>
      </div>
      
      <div className="ml-4 text-gray-400 text-sm">
        {formatDuration(duration)}
      </div>
    </div>
  );
}
