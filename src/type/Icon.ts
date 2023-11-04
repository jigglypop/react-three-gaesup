export type IGradientIcon = {
  children: JSX.Element;
  onClick?: (e) => void;
  text: string;
  className?: string;
  id?: string;
};

export type IAvatarIcon = {
  children: JSX.Element;
  text?: string;
  onClick?: (e) => void;
  onLogout?: (e) => void;
  // Tooltip?: ({ iconRef, text, onLogout }: IToolTip) => JSX.Element;
  id?: string;
};
