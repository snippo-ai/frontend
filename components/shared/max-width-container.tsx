import { ReactNode } from "react";

type MaxWidthContainerProps = {
  children: ReactNode;
};

const MaxWidthContainer = ({ children }: MaxWidthContainerProps) => {
  return <div className="container max-w-4xl mx-auto">{children}</div>;
};

export default MaxWidthContainer;
