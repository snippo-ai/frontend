import { SectionIconMap, SECTIONS_ENUM } from "@/lib/mocks/settings";
import { Fragment } from "react";
import ComingSoon from "./coming-soon";
import MainContentHeader from "./main-content-header";

const AccountSection = () => {
  return (
    <Fragment>
      <MainContentHeader
        title="Account Settings"
        description="Manage your account information, email preferences, and account status."
        icon={SectionIconMap[SECTIONS_ENUM.ACCOUNT]}
      />
      <ComingSoon />
    </Fragment>
  );
};

export default AccountSection;
