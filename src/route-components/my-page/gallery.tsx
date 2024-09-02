import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../reusable-components/modal";
import { PostModal } from "../post-view/post-modal";
import { EditPost } from "../post/edit-post";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useGetPosts } from "../../api-hooks/my-page";

export const Gallery = () => {
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const [isEditOpen, OpenEdit] = useState(false);

  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    isError: isPostError,
    error: postError,
  } = useGetPosts(postLimit);

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);
  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }

  return (
    <div className="flex h-[35.62rem] w-full flex-row flex-wrap gap-5 overflow-y-scroll">
      <Modal
        isOpen={isPostOpen}
        close={() => {
          openPost(false);
        }}
      >
        <PostModal
          postId={postId}
          openEditPost={() => {
            openPost(false);
            OpenEdit(true);
          }}
        />
      </Modal>
      <Modal
        isOpen={isEditOpen}
        close={() => {
          OpenEdit(false);
        }}
      >
        <EditPost
          postId={postId}
          close={() => {
            OpenEdit(false);
          }}
        />
      </Modal>
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <img
              key={post._id}
              className="h-[19rem] w-[18.43rem] overflow-hidden rounded-t-3xl bg-neutral-400 object-cover"
              onClick={() => {
                setPostId(post._id);
                openPost(true);
              }}
              src={post.photoUrls[0]}
            />
          );
        })}

      <div
        ref={nearEndPostRef}
        className={clsx(
          "flex w-full items-center justify-center text-2xl",
          hasNextPage ? "h-[calc(11rem/3)]" : "",
        )}
      >
        {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

export const GalleryMobile = () => {
  const navigate = useNavigate();
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    isError: isPostError,
    error: postError,
  } = useGetPosts(postLimit);
  // const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);
  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }

  return (
    <div className="absolute inset-x-0 mx-auto flex h-[500px] w-[19.4rem] flex-row flex-wrap gap-5 self-center overflow-y-scroll">
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <img
              key={post._id}
              className="h-36 w-36 rounded-3xl bg-neutral-400 object-cover"
              onClick={() => {
                navigate(`post/${post._id}`);
              }}
              src={post.photoUrls[0]}
            />
          );
        })}
      <div
        ref={nearEndPostRef}
        className={clsx(
          "flex w-full items-center justify-center text-2xl",
          hasNextPage ? "h-[calc(11rem/3)]" : "",
        )}
      >
        {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
      </div>
    </div>
  );
};
