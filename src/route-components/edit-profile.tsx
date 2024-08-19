import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "../reusable-components/input-field";
import PersonIcon from "../assets/svg/profile.svg";
import KeyIcon from "../assets/svg/key.svg";
import EnvelopeIcon from "../assets/svg/envelope.svg";
import { useEditProfile } from "../api-hooks/edit-profile.ts";
import {
  ProfileFormValue,
  editProfileFormValueSchema,
} from "../common/types/profile.ts";
import { Alert } from "../reusable-components/alert";
import cameraIcon from "../assets/svg/camera-icon.svg";
import { Button } from "../reusable-components/button.tsx";
import { UploadImage } from "../reusable-components/upload-image.tsx";
import { Switch } from "../reusable-components/switch.tsx";
import { Profile } from "../common/types/profile-data.ts";
import {
  ContainterMobile,
  ContainterWeb,
} from "../reusable-components/container.tsx";
import { TextArea } from "../reusable-components/text-area.tsx";

type EditProfileProps = {
  profile: Profile;
  onClose: () => void;
  onRefetch: () => void;
};

const EditProfileLayout = ({
  onClose,
  profile,
  onRefetch,
}: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ProfileFormValue>({
    criteriaMode: "all",
    resolver: zodResolver(editProfileFormValueSchema),
    //defaultValues: profile,
  });

  const { isError, error, isSuccess, mutate } = useEditProfile();
  if (isError) {
    //alert//console.log("error edit", error);
  }

  if (isSuccess) {
    onClose();
    onRefetch();
  }

  const onSubmit: SubmitHandler<ProfileFormValue> = (formData) => {
    mutate(formData);
  };

  //   if(!profile) {
  //     return <CircularProgress />
  //   }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[380px]">
      <Alert status="error" message={error?.message} />
      <div className="mb-2 size-5 h-8 w-full text-center text-2xl font-bold leading-8">
        ویرایش حساب
      </div>
      <div className="flex flex-col items-center gap-12">
        <div className="flex w-28 flex-col items-center gap-10">
          <UploadImage
            placeholderImage={profile.profileImage ?? cameraIcon}
            error={errors.profileImage?.message}
            className="block h-[90px] w-[90px] rounded-full"
            {...register("profileImage", {
              onChange: () => trigger("profileImage"),
            })}
          />
          <div className="size-3.5 h-8 w-28 text-center font-medium">
            عکس پروفایل
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-3">
            <InputField
              fieldsize="small"
              placeholder="نام"
              defaultValue={profile?.firstName}
              error={errors.firstName?.message}
              svg={PersonIcon}
              {...register("firstName")}
            />
            <InputField
              fieldsize="small"
              placeholder="نام خانوادگی"
              defaultValue={profile?.lastName}
              error={errors.lastName?.message}
              svg={PersonIcon}
              {...register("lastName")}
            />
            <InputField
              fieldsize="small"
              type="email"
              placeholder="ایمیل"
              defaultValue={profile?.email}
              error={errors.email?.message}
              svg={EnvelopeIcon}
              {...register("email")}
            />
            <InputField
              fieldsize="small"
              placeholder="رمز عبور"
              type="password"
              error={errors.password?.message}
              svg={KeyIcon}
              {...register("password")}
            />
            <InputField
              fieldsize="small"
              placeholder="تکرار رمز عبور"
              type="password"
              error={errors.confirmPassword?.message}
              svg={KeyIcon}
              {...register("confirmPassword")}
            />
          </div>
          <Switch
            defaultChecked={profile?.isPrivate}
            label="پیچ خصوصی باشه"
            {...register("isPrivate")}
          />

          <div className="flex h-32 flex-col gap-2">
            <label className="flex flex-col gap-4">
              بایو
              <TextArea
                rows={3}
                defaultValue={profile?.bio}
                {...register("bio")}
              />
            </label>
          </div>
          <div className="flex h-8 flex-row justify-end gap-2">
            {/* <CancelBtn
                className="w-28"
                onClick={() => navigate(urls.myPage)}
              >
                پشیمون شدم
              </CancelBtn> */}
            <Button
              btnColor="transparent"
              type="button"
              onClick={() => onClose()}
            >
              پشیمون شدم
            </Button>
            <Button classes="w-48" type="submit">
              ثبت تغییرات
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const EditProfile = ({
  onClose,
  profile,
  onRefetch,
}: EditProfileProps) => {
  return (
    <ContainterWeb>
      <EditProfileLayout
        onClose={onClose}
        profile={profile}
        onRefetch={onRefetch}
      />
    </ContainterWeb>
  );
};

export const EditProfileMoblie = ({
  onClose,
  onRefetch,
  profile,
}: EditProfileProps) => {
  return (
    <ContainterMobile>
      {" "}
      <EditProfileLayout
        onClose={onClose}
        profile={profile}
        onRefetch={onRefetch}
      />
    </ContainterMobile>
  );
};
