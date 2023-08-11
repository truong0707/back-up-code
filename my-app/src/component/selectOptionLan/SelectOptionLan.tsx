import React from "react";
import { Select, Space } from "antd";
import { useTranslation, Trans } from "react-i18next";


const lngs: any = {
  en: { nativeName: "English" },
  vi: { nativeName: "Tiếng việt" },
};

export default function SelectOptionLan() {
  const { t, i18n } = useTranslation(['homeAdmin', 'adminManagerA']);


  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  //   i18n.changeLanguage(lng);
  // };

  return (
    <Space wrap>
      {Object.keys(lngs).map((lng) => (
        <button
          type="submit"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          {lngs[lng].nativeName}
        </button>
      ))}

      {/* <p>
        <Trans i18nKey="admin home.hi">Edit</Trans>
      </p>

      {t('admin home.hi')} */}

      {/* <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "vienamese", label: "Tiếng việt" },
          { value: "lucy", label: "Tiếng anh" },
          // { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      /> */}
    </Space>
  );
}
