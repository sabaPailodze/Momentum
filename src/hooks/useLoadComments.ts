import { useEffect, useState } from "react";
import { getComments } from "../services/axios";
import { CommentProps } from "../types/types";

interface UseLoadCommentsProps {
  taskId: number;
  updateTotalComments: (taskId: number, newTotal: number) => void;
}

export const useLoadComments = ({
  taskId,
  updateTotalComments,
}: UseLoadCommentsProps) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: CommentProps[] = await getComments(taskId);
        const mappedComments = response.map((comment) => ({
          ...comment,
          sub_comments: comment.sub_comments || [],
        }));
        setComments(mappedComments);

        const total =
          mappedComments.length +
          mappedComments.reduce(
            (acc: number, c: CommentProps) =>
              acc + (c.sub_comments?.length || 0),
            0
          );
        updateTotalComments(taskId, total);
      } catch (err) {
        setError("კომენტარების ჩატვირთვა ვერ მოხერხდა");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [taskId, updateTotalComments]);

  return { comments, setComments, loading, error };
};
