import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const checkIcons= (classIcon: string): IconProp => {
  let icon: IconProp;

  if (classIcon === "code") {
    icon = "code";
  } else if (classIcon === "user") {
    icon = "user";
  } else if (classIcon === "phone") {
    icon = "phone";
  } else if (classIcon === "folder-open") {
    icon = "folder-open";
  } else {
    icon = "folder-open";
  }

  return icon;
};
