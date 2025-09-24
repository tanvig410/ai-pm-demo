import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  elementId: string;
  position: { x: number; y: number };
}

interface CommentSystemProps {
  isActive: boolean;
  onToggle: () => void;
}

export function CommentSystem({ isActive, onToggle }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleElementClick);
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'crosshair';
      
      // Add hover effect for selectable elements
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target !== hoveredElement) {
          // Remove previous highlight
          if (hoveredElement) {
            hoveredElement.style.outline = '';
          }
          // Add new highlight
          target.style.outline = '2px solid #FF6B6B';
          target.style.outlineOffset = '2px';
          setHoveredElement(target);
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        target.style.outline = '';
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    } else {
      document.removeEventListener('click', handleElementClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'default';
      setSelectedElement(null);
      setShowCommentInput(false);
      
      // Remove any remaining highlights
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        setHoveredElement(null);
      }
    }
  }, [isActive, hoveredElement]);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleElementClick = (e: MouseEvent) => {
    if (!isActive) return;
    
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    
    // Don't allow commenting on the comment system itself
    if (target.closest('[data-comment-system]')) {
      return;
    }

    const elementId = generateElementId(target);
    
    setSelectedElement(elementId);
    setShowCommentInput(true);
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Remove highlight from selected element
    if (hoveredElement) {
      hoveredElement.style.outline = '';
    }
  };

  const generateElementId = (element: HTMLElement): string => {
    // Generate a unique ID for the element based on its characteristics
    const rect = element.getBoundingClientRect();
    const classList = Array.from(element.classList).join('-');
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.slice(0, 20) || '';
    
    return `${tagName}-${classList}-${rect.top.toFixed(0)}-${rect.left.toFixed(0)}-${textContent}`.replace(/\s+/g, '-');
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedElement) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      author: 'Current User',
      timestamp: new Date(),
      elementId: selectedElement,
      position: mousePosition
    };

    setComments(prev => [...prev, newComment]);
    setCommentText('');
    setShowCommentInput(false);
    setSelectedElement(null);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const activeComments = comments.filter(comment => comment.elementId === selectedElement);

  return (
    <>
      {/* Comment Mode Overlay */}
      {isActive && (
        <div className="fixed inset-0 z-50 pointer-events-none" data-comment-system>
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          
          {/* Instructions */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-[#1C1D20] border border-[#2A2B30] rounded-lg px-4 py-2 pointer-events-auto">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#F5F6F7]">Click on any component to add a comment</span>
              <button
                onClick={onToggle}
                className="ml-4 p-1 hover:bg-[#2A2B30] rounded transition-colors"
              >
                <X className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Input Modal */}
      {showCommentInput && selectedElement && (
        <div 
          className="fixed z-50 bg-[#1C1D20] border border-[#2A2B30] rounded-lg p-4 w-80 pointer-events-auto shadow-xl"
          style={{
            left: Math.min(mousePosition.x, window.innerWidth - 320),
            top: Math.min(mousePosition.y, window.innerHeight - 200)
          }}
          data-comment-system
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[#9CA3AF]" />
            <span className="text-sm font-medium text-[#F5F6F7]">Add Comment</span>
          </div>

          {/* Existing Comments */}
          {activeComments.length > 0 && (
            <div className="mb-3 max-h-32 overflow-y-auto">
              {activeComments.map(comment => (
                <div key={comment.id} className="bg-[#0E0E11] rounded p-2 mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-[#F5F6F7]">{comment.text}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        {comment.author} • {comment.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-1 hover:bg-[#2A2B30] rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-[#9CA3AF]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment..."
            className="w-full h-20 bg-[#0E0E11] border border-[#2A2B30] rounded text-sm text-[#F5F6F7] placeholder-[#9CA3AF] p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            autoFocus
          />

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => {
                setShowCommentInput(false);
                setSelectedElement(null);
              }}
              className="text-sm text-[#9CA3AF] hover:text-[#F5F6F7] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="flex items-center gap-2 bg-[#FF6B6B] text-white px-3 py-1 rounded text-sm hover:bg-[#FF5252] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3 h-3" />
              Add Comment
            </button>
          </div>
        </div>
      )}

      {/* Comment Indicators */}
      {!isActive && comments.map(comment => (
        <div
          key={comment.id}
          className="fixed z-40 pointer-events-auto group"
          style={{
            left: comment.position.x - 12,
            top: comment.position.y - 12
          }}
          data-comment-system
        >
          <div className="relative">
            <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF5252] transition-colors shadow-lg">
              <MessageSquare className="w-3 h-3 text-white" />
            </div>
            
            {/* Comment tooltip on hover */}
            <div className="absolute left-8 top-0 bg-[#1C1D20] border border-[#2A2B30] rounded-lg p-3 w-60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
              <p className="text-sm text-[#F5F6F7] mb-2">{comment.text}</p>
              <p className="text-xs text-[#9CA3AF]">
                {comment.author} • {comment.timestamp.toLocaleDateString()} at {comment.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}