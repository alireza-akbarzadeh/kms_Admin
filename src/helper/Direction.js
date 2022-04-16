import { useTranslation } from "react-i18next";

const Direction = (native = false) => {
  const { t } = useTranslation();

  if (native) {
    return t("dir");
  } else {
    return t("dir") === "rtl";
  }
};

export default Direction;
