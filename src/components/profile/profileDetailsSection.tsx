// styles
import {
  ProfileDetailsDiv,
  ProfileDetailsTextDiv,
  ProfileGroupsBodyUl,
  ProfileGroupsDiv,
  ProfileGroupsHeaderH4,
  ProfileImageDiv,
  ProfileImageTextSpan,
  ProfileNameH2,
} from "@styles/components/myProfile/profileDetailsSection.styles";

// interfaces
interface groupsType {
  id: string;
  displayName: string;
}

interface ProfileDetailsProps {
  name: string;
  groups: groupsType[];
}
/**
 * @name getInitialsFromName
 * @description Function for returning the initials of name
 * @param name
 */
const getInitialsFromName = (name: string) => {
  return name
    ?.split(" ")
    .map((char) => char[0])
    .join("");
};

/**
 * @name ProfileDetails
 * @description Method for generating the JSX for the ProfileDetails component
 * @returns JSX for Profile Page
 */
const ProfileDetails = ({ name, groups }: ProfileDetailsProps) => {
  // JSX for the ProfileDetails component
  return (
    <ProfileDetailsDiv>
      <ProfileImageDiv>
        <ProfileImageTextSpan>{getInitialsFromName(name)}</ProfileImageTextSpan>
      </ProfileImageDiv>
      <ProfileDetailsTextDiv>
        <ProfileNameH2>{name}</ProfileNameH2>
        <ProfileGroupsDiv>
          <ProfileGroupsHeaderH4>Groups</ProfileGroupsHeaderH4>
          <ProfileGroupsBodyUl>
            {groups?.map((group: groupsType) => (
              <li key={group.id}>{group?.displayName}</li>
            ))}
          </ProfileGroupsBodyUl>
        </ProfileGroupsDiv>
      </ProfileDetailsTextDiv>
    </ProfileDetailsDiv>
  );
};

export default ProfileDetails;
