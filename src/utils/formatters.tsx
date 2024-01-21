import { ArgsProps } from "antd/es/notification/interface";

import {
  IconError,
  IconInfo,
  IconLoader,
  IconSuccess,
  IconWarning,
} from "@assets/index";

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const JsonToHtml = ({ json }: { json: object }) => (
  <pre>
    <code>{JSON.stringify(json, null, 4)}</code>
  </pre>
);

export const toastObject = (
  type: "success" | "error" | "warning" | "info" | "loading",
  title: string,
  description: string,
  key?: string,
) => {
  let icon;
  let borderColor;
  let iconColor;

  switch (type) {
    case "success":
      icon = <IconSuccess />;
      borderColor = "border-green-600";
      iconColor = "text-green-600";
      break;
    case "error":
      icon = <IconError />;
      borderColor = "border-red-500";
      iconColor = "text-red-500";
      break;
    case "warning":
      icon = <IconWarning />;
      borderColor = "border-yellow-500";
      iconColor = "text-yellow-500";
      break;
    case "info":
      icon = <IconInfo />;
      borderColor = "border-blue-700";
      iconColor = "text-blue-700";
      break;

    case "loading":
      icon = <IconLoader width={24} height={24} />;
      borderColor = "border-primary-500";
      iconColor = "text-primary-500";
      break;

    default:
      icon = <IconError />;
      borderColor = "border-red-500";
      iconColor = "text-red-500";
      break;
  }

  if (key)
    return {
      icon: icon,
      placement: "top",
      className: `${iconColor} border-l-4 border-solid ${borderColor}`,
      message: <h3 className="text-lg/[22px]">{title}</h3>,
      description: <p>{description}</p>,
      duration: type === "loading" ? 200 : 4,
      key: key,
    } as ArgsProps;

  return {
    icon: icon,
    placement: "top",
    className: `${iconColor} border-l-4 border-solid ${borderColor}`,
    message: <h3 className="text-lg/[22px]">{title}</h3>,
    description: <p>{description}</p>,
  } as ArgsProps;
};

export const messageObject = (
  type: "success" | "error" | "warning" | "info" | "loading",
  content: string,
  key?: string,
) => {
  let icon;

  switch (type) {
    case "success":
      icon = <IconSuccess className="text-green-600" />;
      break;
    case "error":
      icon = <IconError className="text-red-500" />;
      break;
    case "warning":
      icon = <IconWarning className="text-yellow-500" />;
      break;
    case "info":
      icon = <IconInfo className="text-blue-700" />;
      break;

    case "loading":
      icon = <IconLoader className="text-primary-500" />;
      break;

    default:
      icon = <IconError className="text-red-500" />;
      break;
  }

  if (key)
    return {
      icon: icon,
      content,
      key: key,
      duration: type === "loading" ? 200 : 4,
    };

  return {
    icon: icon,
    content: content,
  };
};
