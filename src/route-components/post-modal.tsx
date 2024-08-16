import { HTMLAttributes, useEffect, useState } from "react";
import { ProfileSummary } from "../reusable-components/profile-summary";
import { Post } from "../common/types/post";
import { useNavigate } from "react-router-dom";
import { urls } from "../common/routes";
import { Button } from "../reusable-components/button";
import leftArrow from "../assets/svg/arrow.svg";
import pen from "../assets/svg/pen.svg";
import dot from "../assets/svg/dot.svg";

import clsx from "clsx";
import { ContainterWeb } from "../reusable-components/container";

interface Captions
  extends HTMLAttributes<HTMLDivElement>,
    Omit<Post, "photos"> {}
interface Carousel
  extends HTMLAttributes<HTMLDivElement>,
    Pick<Post, "photos"> {}
const PostCaptions = (props: Captions) => {
  const { className, hashtags, caption, mentions, date, ...rest } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")} {...rest}>
      <small>{date}</small>
      <p className="text-sm">{caption}</p>
      <div lang="fa" dir="rtl">
        {hashtags.map((hashtag) => (
          <span key={hashtag} className="m-2 rounded-lg bg-red-100 p-2">
            {hashtag}
          </span>
        ))}
      </div>
      <div className="flex w-fit flex-wrap text-xs">
        {mentions.map((mention) => (
          <span
            key={mention}
            className="m-2 rounded-lg bg-emerald-200 p-2 text-xs"
          >
            {mention}
          </span>
        ))}
      </div>
    </section>
  );
};
const Carousel = (props: Carousel) => {
  const { photos, ...rest } = props;
  const [index, setIndex] = useState(0);
  useEffect(() => console.log(index), [index]);
  return (
    <div className={'" justify-between" flex items-center'} {...rest}>
      <img
        src={leftArrow}
        alt=""
        className="z-20 mx-2 h-9 rotate-180 cursor-pointer rounded-lg bg-white p-2 opacity-45"
        onClick={() => {
          if (index > 0) {
            setIndex((index) => index - 1);
          }
        }}
      />
      <img
        src={photos[index]}
        alt=""
        className="h-[375px] w-[600px] rounded-3xl"
      />
      <img
        src={leftArrow}
        alt=""
        className="z-20 mx-2 h-9 cursor-pointer rounded-lg bg-white p-2 opacity-45"
        onClick={() => {
          if (index < photos.length - 1) {
            setIndex((index) => index + 1);
          }
        }}
      />
    </div>
  );
};

const CarouselIndicator = ({
  count,
  index,
}: {
  count: number;
  index: number;
}) => {
  const indicatorArray = Array(count).fill(0);
  indicatorArray[index] = 1;
  return (
    <div className="absolute bottom-4 flex items-center gap-2">
      {indicatorArray.map((val) => {
        if (val) {
          return (
            <img
              src={dot}
              className="h-3 rounded-full border-2 border-solid border-gray-400"
            />
          );
        } else {
          return <img src={dot} className="h-3" />;
        }
      })}
    </div>
  );
};
const CarouselMobile = (props: Carousel) => {
  const { photos, ...rest } = props;
  const [index, setIndex] = useState(0);
  useEffect(() => console.log(index), [index]);
  return (
    <div className="relative flex flex-col items-center">
      <div className={"flex items-center justify-between"} {...rest}>
        <img
          src={leftArrow}
          alt=""
          className="absolute right-0 mx-1 h-3 rotate-180 cursor-pointer rounded-full bg-white p-1 opacity-75"
          onClick={() => {
            if (index > 0) {
              setIndex((index) => index - 1);
            }
          }}
        />
        <img src={photos[index]} alt="" className="w-full" />
        <img
          src={leftArrow}
          alt=""
          className="absolute left-0 mx-1 h-3 cursor-pointer rounded-full bg-white p-1 opacity-75"
          onClick={() => {
            if (index < photos.length - 1) {
              setIndex((index) => index + 1);
            }
          }}
        />
      </div>
      <CarouselIndicator count={photos.length} index={index} />
    </div>
  );
};

export const PostModal = ({
  post,
  userName,
  closeModal,
  openEditPost,
}: {
  post: Post;
  userName: string;
  closeModal: () => void;
  openEditPost: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <ContainterWeb className="m-20 w-full justify-between gap-3">
      <Carousel photos={post.photos} />
      <div className="flex flex-col gap-3 p-5">
        <div className="flex w-full flex-row justify-between">
          <ProfileSummary
            userName={userName}
            handleClick={() => navigate(urls.main)}
          />
          <Button
            onClick={() => {
              closeModal();
              openEditPost();
            }}
          >
            ویرایش پست
          </Button>
        </div>

        <PostCaptions
          caption={post.caption}
          mentions={post.mentions}
          hashtags={post.hashtags}
          date={post.date}
        />
      </div>
    </ContainterWeb>
  );
};

export const PostViewMobile = ({
  post,
  userName,
  closeModal,
  openEditPost,
}: {
  post: Post;
  userName: string;
  closeModal: () => void;
  openEditPost: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex grow flex-col">
      <div className="flex flex-row justify-between">
        <ProfileSummary
          className="my-1"
          userName={userName}
          handleClick={() => navigate(urls.main)}
        />
        <Button
          btnColor="transparent"
          onClick={() => {
            closeModal();
            openEditPost();
          }}
        >
          <img src={pen} alt="" />
        </Button>
      </div>

      <CarouselMobile photos={post.photos} />
      <PostCaptions
        className="px-3"
        caption={post.caption}
        mentions={post.mentions}
        hashtags={post.hashtags}
        date={post.date}
      />
    </div>
  );
};
