import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CommentProps {
  id: string;
  user: {
    id: string;
    username: string;
    profileImage?: string;
  };
  text: string;
  createdAt: string;
  replies?: CommentProps[];
  isReply?: boolean;
}

export default function Comment({
  id,
  user,
  text,
  createdAt,
  replies = [],
  isReply = false
}: CommentProps) {
  const [showReplies, setShowReplies] = React.useState(false);
  const [replyText, setReplyText] = React.useState('');
  const [isReplying, setIsReplying] = React.useState(false);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mt-6'}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-dark-600 overflow-hidden">
            {user.profileImage ? (
              <Image 
                src={user.profileImage} 
                alt={user.username}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-ruby-600 text-white font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-dark-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Link href={`/profile/${user.id}`} className="font-medium text-white hover:text-ruby-400">
                {user.username}
              </Link>
              <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
            </div>
            <p className="text-gray-200">{text}</p>
          </div>
          
          {!isReply && (
            <div className="mt-2 flex space-x-4">
              <button 
                onClick={() => setIsReplying(!isReplying)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Responder
              </button>
              {replies.length > 0 && (
                <button 
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {showReplies ? 'Ocultar respostas' : `Ver ${replies.length} resposta${replies.length > 1 ? 's' : ''}`}
                </button>
              )}
            </div>
          )}
          
          {isReplying && (
            <div className="mt-3">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-dark-600"></div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escreva uma resposta..."
                    className="input-field w-full text-sm"
                    rows={2}
                  />
                  <div className="mt-2 flex justify-end">
                    <button 
                      onClick={() => setIsReplying(false)}
                      className="text-sm text-gray-400 hover:text-white mr-3"
                    >
                      Cancelar
                    </button>
                    <button 
                      className="btn-primary text-sm py-1"
                      disabled={!replyText.trim()}
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {showReplies && replies.length > 0 && (
            <div className="mt-3">
              {replies.map((reply) => (
                <Comment
                  key={reply.id}
                  id={reply.id}
                  user={reply.user}
                  text={reply.text}
                  createdAt={reply.createdAt}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
