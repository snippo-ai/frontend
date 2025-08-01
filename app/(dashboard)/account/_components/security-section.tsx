import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Fragment } from "react";
import ComingSoon from "./coming-soon";
import MainContentHeader from "./main-content-header";

const SecuritySection = () => {
  return (
    <Fragment>
      <MainContentHeader
        title="Security Settings"
        description="Manage your password, two-factor authentication, and security preferences."
        icon={SectionIconMap[SECTIONS_ENUM.SECURITY]}
      />
      <ComingSoon />
    </Fragment>
  );
};

export default SecuritySection;
