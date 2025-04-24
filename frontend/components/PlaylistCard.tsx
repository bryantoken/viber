import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PlaylistCardProps {
  id: string;
  slug: string;
  title: string;
  situation: string;
  coverImage: string;
  creator: {
    username: string;
    profileImage?: string;
  };
  tracksCount: number;
  likesCount: number;
}

export default function PlaylistCard({
  id,
  slug,
  title,
  situation,
  coverImage,
  creator,
  tracksCount,
  likesCount
}: PlaylistCardProps) {
  return (
    <div className="card group transition-all duration-300 hover:scale-[1.02]">
      <Link href={`/playlist/${slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {coverImage ? (
            <Image 
              src={coverImage} 
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ruby-800 to-dark-700 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-lg font-bold text-white truncate">{title}</h3>
            <p className="text-sm text-gray-300 truncate">Para quando: {situation}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-dark-600 overflow-hidden">
                {creator.profileImage ? (
                  <Image 
                    src={creator.profileImage} 
                    alt={creator.username}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-ruby-600 text-white font-bold">
                    {creator.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-300">{creator.username}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className="text-xs text-gray-400">{tracksCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ruby-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-400">{likesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
