import { IIcon } from '@interfaces/index';

export const IconSidebarOpen = ({
  size = 24,
  className = '',
  onClick,
  style
}: IIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    onClick={onClick}
    className={className}
    style={style}
    strokeWidth="0.1"
    fill="currentColor"
    viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      fillRule="evenodd"
      d="M7.22 14.47 9.69 12 7.22 9.53a.75.75 0 1 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06z"
    />
    <path
      stroke="currentColor"
      fillRule="evenodd"
      d="M3.75 2A1.75 1.75 0 0 0 2 3.75v16.5c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0 0 22 20.25V3.75A1.75 1.75 0 0 0 20.25 2H3.75zM3.5 3.75a.25.25 0 0 1 .25-.25H15v17H3.75a.25.25 0 0 1-.25-.25V3.75zm13 16.75v-17h3.75a.25.25 0 0 1 .25.25v16.5a.25.25 0 0 1-.25.25H16.5z"
    />
  </svg>
);
