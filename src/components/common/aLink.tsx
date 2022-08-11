import { ReactNode } from "react";
import Link from "next/link";
import { StyledATag } from "@styles/components/common/aLink.style";

interface ALinkProps {
  href: string;
  children: ReactNode;
}

const ALink = ({ href, children }: ALinkProps) => {
  return (
    <Link href={href} passHref>
      <StyledATag>{children}</StyledATag>
    </Link>
  );
};

export default ALink;
