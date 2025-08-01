import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Fragment } from "react";
import ComingSoon from "./coming-soon";
import MainContentHeader from "./main-content-header";

const IntegrationsSection = () => {
  return (
    <Fragment>
      <MainContentHeader
        title="Integrations"
        description="Connect your Snippo AI account with other tools and services."
        icon={SectionIconMap[SECTIONS_ENUM.INTEGRATIONS]}
      />
      <ComingSoon />
    </Fragment>
  );
};

export default IntegrationsSection;
