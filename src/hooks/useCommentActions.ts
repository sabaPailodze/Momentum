import { addComment } from "../services/axios";
import { UseCommentActionsProps } from "../types/types";

export const useCommentActions = ({
  taskId,
  comments,
  newComment,
  replyText,
  setComments,
  setNewComment,
  setReplyText,
  setActiveReplyId,
  updateTotalComments,
}: UseCommentActionsProps) => {
  const handleAddComment = async (parentId: number | null = null) => {
    if (!newComment.trim()) return;

    try {
      const response = await addComment(taskId, newComment, parentId);
      const commentWithSubs = { ...response, sub_comments: [] };

      if (parentId) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === parentId
              ? {
                  ...comment,
                  sub_comments: [
                    ...(comment.sub_comments || []),
                    commentWithSubs,
                  ],
                }
              : comment
          )
        );
      } else {
        setComments((prev) => [...prev, commentWithSubs]);
      }

      setNewComment("");
      const newTotal =
        comments.length +
        comments.reduce((acc, c) => acc + (c.sub_comments?.length || 0), 0) +
        1;
      updateTotalComments(taskId, newTotal);
    } catch (err) {
      console.error("კომენტარის დამატება ვერ მოხერხდა", err);
    }
  };

  const handleAddReply = async (parentId: number) => {
    if (!replyText.trim()) return;

    try {
      const response = await addComment(taskId, replyText, parentId);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                sub_comments: [...(comment.sub_comments || []), response],
              }
            : comment
        )
      );

      setReplyText("");
      setActiveReplyId(null);
      const newTotal =
        comments.length +
        comments.reduce((acc, c) => acc + (c.sub_comments?.length || 0), 0) +
        1;
      updateTotalComments(taskId, newTotal);
    } catch (err) {
      console.error("პასუხის დამატება ვერ მოხერხდა", err);
    }
  };

  const toggleReply = (id: number) => {
    setActiveReplyId((prev) => (prev === id ? null : id));
    setReplyText("");
  };

  return { handleAddComment, handleAddReply, toggleReply };
};
