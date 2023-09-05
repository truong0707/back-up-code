import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const checkIcons = (classIcon: string): IconProp => {
  let icon: IconProp;

  if (classIcon === "code") {
    icon = "code";
  } else if (classIcon === "user") {
    icon = "user";
  } else if (classIcon === "phone") {
    icon = "phone";
  } else if (classIcon === "education") {
    icon = "user-graduate";
  } else if (classIcon === "medical") {
    icon = "suitcase-medical";
  } else if (classIcon === "Justice") {
    icon = "scale-unbalanced-flip";
  } else if (classIcon === "folder") {
    icon = "folder-open";
  }else if (classIcon === "coin") {
    icon = "coins";
  } else {
    icon = "folder-open";
  }

  return icon;
};
