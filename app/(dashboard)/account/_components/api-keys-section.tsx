import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Fragment } from "react";
import ComingSoon from "./coming-soon";
import MainContentHeader from "./main-content-header";

const ApiKeysSection = () => {
  return (
    <Fragment>
      <MainContentHeader
        title="API Keys"
        description="Manage your API keys for programmatic access to Snippo AI."
        icon={SectionIconMap[SECTIONS_ENUM.API_KEYS]}
      />
      <ComingSoon />
    </Fragment>
  );
};

export default ApiKeysSection;
