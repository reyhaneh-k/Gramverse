import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Comment as CommentType } from "../../../types/notifications";
import { getTimeDifference } from "../../../common/utilities/time-difference";
import { RoundPicture } from "../../../components/round-picture";

export const Comment = (props: CommentType) => {
  const {
    postImage,
    performerUserName,
    creationDate,
    postId,
    seen,
    comment,
    postCreator,
  } = props;
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex w-full items-center gap-5 rounded-2xl py-2",
        seen && "bg-primary",
        !seen && "bg-purple-200",
      )}
    >
      <RoundPicture
        size="large"
        picture={postImage}
        onClick={() => {
          navigate(`/${postCreator}/post/${postId}`);
        }}
      />
      <div className="flex flex-col items-start gap-1">
        <p className="m-0 p-0">{`${performerUserName} واسه این پستت کامنت گذاشته`}</p>
        <small className="text-xs text-gray-500">{comment}</small>
        <small className="text-xs text-gray-500">
          {getTimeDifference(new Date(), new Date(creationDate))}
        </small>
      </div>
    </div>
  );
};
