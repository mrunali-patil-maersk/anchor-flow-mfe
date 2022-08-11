import {
  LinksWrapperSection,
  LinksSectionBodyLinksSpan,
  LinksSectionBodyLinksWrapperDiv,
  LinksSectionHeaderH3,
  LinksSectionBodyHeaderH6,
} from "@styles/components/myProfile/linksSection.styles";

//interfaces
interface LinksType {
  id: string;
  route: string;
}

interface LinksSectionProps {
  links: Array<LinksType>;
}

const LinksSection = ({ links }: LinksSectionProps) => {
  return (
    <LinksWrapperSection>
      <LinksSectionHeaderH3>Details</LinksSectionHeaderH3>
      <div>
        <LinksSectionBodyHeaderH6></LinksSectionBodyHeaderH6>
        <LinksSectionBodyLinksWrapperDiv>
          {/* {links?.map((link) => (
            <LinksSectionBodyLinksSpan key={link.id}></LinksSectionBodyLinksSpan>
          ))} */}
        </LinksSectionBodyLinksWrapperDiv>
      </div>
    </LinksWrapperSection>
  );
};

export default LinksSection;
