import { useState } from "react";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { CreatePost } from "../post/create-post";

export const EmptyGallery = () => {
  const [createPost, setCreatePost] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <Modal
        isOpen={createPost}
        close={() => {
          setCreatePost(false);
        }}
      >
        <CreatePost
          close={() => {
            setCreatePost(false);
          }}
        />
      </Modal>
      <div className="size-5 h-[4.43rem] w-[22.2rem] text-center font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-80">
        <Button
          classes="w-48 m-auto"
          type="submit"
          onClick={() => {
            setCreatePost(true);
          }}
        >
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};

export const EmptyGalleryMobile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-3xl border border-solid border-form-border py-12">
      <div className="h-24 w-[19.4rem] text-center text-xl font-bold leading-8">
        هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
      </div>
      <div className="flex w-72">
        <Button
          classes="w-48 m-auto"
          type="submit"
          onClick={() => {
            navigate("/create-post");
          }}
        >
          ایجاد پست جدید
        </Button>
      </div>
    </div>
  );
};
