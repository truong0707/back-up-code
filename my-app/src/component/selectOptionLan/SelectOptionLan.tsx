import React from "react";
import { Select, /* Space */ } from "antd";
import { useTranslation, /* Trans */ } from "react-i18next";

// const lngs: any = {
//   en: { nativeName: "English" },
//   vi: { nativeName: "Tiếng việt" },
// };

export default function SelectOptionLan() {
  const { i18n } = useTranslation(["homeAdmin"]);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Chọn ngôn ngữ"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      onChange={handleChange}
      options={[
        {
          value: 'en',
          label: "English",
        },
        {
          value: 'vi',
          label: "vietnamese",
        },
      ]}
    />
    // <Space wrap>
    //   {Object.keys(lngs).map((lng) => (
    //     <button
    //       type="submit"
    //       key={lng}
    //       onClick={() => i18n.changeLanguage(lng)}
    //       disabled={i18n.resolvedLanguage === lng}
    //     >
    //       {lngs[lng].nativeName}
    //     </button>
    //   ))}

    //   <p>
    //     <Trans i18nKey="admin home.hi">Edit</Trans>
    //   </p>

    //   {t("admin home.hi")}
    //   {Object.keys(lngs).map((lng) => (
    //     <Select
    //       defaultValue="lucy"
    //       style={{ width: 120 }}
    //       onChange={handleChange}
    //       options={[
    //         { value: "vienamese", label: "Tiếng việt" },
    //         { value: "lucy", label: "Tiếng anh" },
    //       ]}
    //     />
    //   ))}

    //   <Select
    //     defaultValue="lucy"
    //     style={{ width: 120 }}
    //     onChange={handleChange}
    //     options={[
    //       { value: "vienamese", label: "Tiếng việt" },
    //       { value: "lucy", label: "Tiếng anh" },
    //     ]}
    //   />
    // </Space>
  );
}
