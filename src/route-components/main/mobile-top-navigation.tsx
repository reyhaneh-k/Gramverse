import { useNavigate } from "react-router-dom";
import menu from "../../assets/svg/menu.svg";
import profile from "../../assets/svg/profile.svg";
import { RoundPicture } from "../../reusable-components/profile-picture";
import { useState } from "react";
import { ModalMobile } from "../../reusable-components/modal";
import { DrawerMenu } from "./mobile-drawer-menu";
export default function MobileTopNavigation({
  userName,
  profileImage,
}: {
  userName: string | undefined;
  profileImage: string | undefined;
}) {
  const navigate = useNavigate();
  const [isMenuOpen, openMenu] = useState(false);

  return (
    <div className="mb-5 flex w-full flex-col justify-center bg-primary">
      <ModalMobile
        isOpen={isMenuOpen}
        close={() => {
          openMenu(false);
        }}
      >
        <DrawerMenu
          close={() => {
            openMenu(false);
          }}
        />
      </ModalMobile>

      <div className="mb-3 mt-2 flex h-10 w-full justify-between">
        <RoundPicture
          picture={profileImage && profileImage !== "" ? profileImage : profile}
          onClick={() => navigate(userName ? `profile/${userName}` : "/")}
        />
        <img
          src={menu}
          alt=""
          className="w-6"
          onClick={() => {
            openMenu(true);
          }}
        />
      </div>
      <div className="h-0.5 bg-gray-300" />
    </div>
  );
}
