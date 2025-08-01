import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Fragment } from "react";
import ComingSoon from "./coming-soon";
import MainContentHeader from "./main-content-header";

const PreferencesSection = () => {
  return (
    <Fragment>
      <MainContentHeader
        title="Preferences"
        description="Customize your Snippo AI experience with personal preferences and settings."
        icon={SectionIconMap[SECTIONS_ENUM.PREFERENCES]}
      />
      <ComingSoon />
    </Fragment>
  );
};

export default PreferencesSection;
