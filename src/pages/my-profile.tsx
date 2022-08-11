// redux
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";

// components
import LinksSection from "@/components/profile/linksSection";
import ProfileDetailsSection from "@/components/profile/profileDetailsSection";
import RightSidePanel from "@/components/profile/rightSidePanel";

//constants
import { linksSectionData } from "src/configs/myProfile.constant";

// styles
import {
  MyProfileDiv,
  MyProfileHeaderH1,
  MyProfileLeftSection,
} from "@styles/pages/myProfile.styles";

/**
 * @name ProfilePage
 * @description Method for generating the JSX for the MyProfilePage route
 * @returns JSX for Next Page
 */
const MyProfile = () => {
  const userData = useAppSelector(selectUser);

  // JSX for the my-profile page
  return (
    <MyProfileDiv>
      <MyProfileLeftSection>
        <MyProfileHeaderH1>My Profile</MyProfileHeaderH1>
        <ProfileDetailsSection name={userData?.name} groups={userData?.groups} />
        <LinksSection links={linksSectionData} />
      </MyProfileLeftSection>
      <RightSidePanel roles={userData?.roles} />
    </MyProfileDiv>
  );
};
MyProfile.requireAuth = true;
export default MyProfile;
