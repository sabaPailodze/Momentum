import { useState } from "react";
import { CommentsSectionProps } from "../../types/types";
import answerIcon from "../../assets/Images/answer.svg";
import { useLoadComments } from "../../hooks/useLoadComments";
import { useCommentActions } from "../../hooks/useCommentActions";

const CommentsSection = ({
  taskId,
  totalComments,
  updateTotalComments,
}: CommentsSectionProps) => {
  const { comments, setComments, loading, error } = useLoadComments({
    taskId,
    updateTotalComments,
  });

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const { handleAddComment, handleAddReply, toggleReply } = useCommentActions({
    taskId,
    comments,
    newComment,
    replyText,
    setComments,
    setNewComment,
    setReplyText,
    setActiveReplyId,
    updateTotalComments,
  });

  return (
    <div className="mt-12">
      <div className="bg-[#F8F3FE] border border-[#DDD2FF] rounded-xl p-8 h-[810px] overflow-scroll">
        <div className="relative mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="დაწერე კომენტარი"
            className="w-full h-32 p-4 bg-white border border-gray-300 rounded-[10px] resize-none focus:outline-none placeholder-[#898989] text-gray-700"
          />
          <button
            onClick={() => handleAddComment()}
            disabled={!newComment.trim()}
            className={`absolute bottom-4 right-4 px-4 py-2 rounded-full text-white bg-[#8338ec] cursor-pointer hover:bg-[#B588F4] duration-100`}
          >
            დააკომენტარე
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#000000] flex items-center gap-2">
            კომენტარები
            <span className="inline-flex items-center justify-center w-[30px] h-[22px] bg-indigo-600 text-white rounded-[30px] text-[14px]">
              {totalComments}
            </span>
          </h2>
        </div>
        {loading ? (
          <p className="text-gray-500 text-center">იტვირთება...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center">კომენტარები არ არის</p>
        ) : (
          <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={comment.author_avatar}
                    alt="author avatar"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {comment.author_nickname}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{comment.text}</p>
                    <button
                      onClick={() => toggleReply(comment.id)}
                      className="mt-2 cursor-pointer flex items-center gap-1 text-[12px] text-[#8338ec]"
                    >
                      <img
                        src={answerIcon}
                        alt="reply icon"
                        className="w-4 h-4"
                      />
                      პასუხი
                    </button>
                  </div>
                </div>
                {activeReplyId === comment.id && (
                  <div className="ml-14 mt-2 relative">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none  placeholder-[#898989] text-gray-700"
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyText.trim()}
                      className={`absolute bottom-3 right-3 px-3 py-1 rounded-full cursor-pointer text-white bg-[#8338ec] hover:bg-[#B588F4] duration-100`}
                    >
                      უპასუხე
                    </button>
                  </div>
                )}

                {comment.sub_comments && comment.sub_comments.length > 0 && (
                  <div className="ml-14 flex flex-col gap-4 mt-4">
                    {comment.sub_comments.map((subComment) => (
                      <div key={subComment.id} className="flex gap-4">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={subComment.author_avatar}
                          alt="author avatar"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">
                            {subComment.author_nickname}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {subComment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
