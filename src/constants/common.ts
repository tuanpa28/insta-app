export type NavLinkProps = {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  href?: string;
  subIcon?: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  dropdown?: React.ReactNode;
  component?: React.ReactNode;
};

export type ImageLabel = {
  src: string;
  alt: string;
};

export const IMAGE_CAROUSEL: ImageLabel[] = [
  { src: '', alt: 'first' },
  { src: '', alt: 'second' },
  { src: '', alt: 'third' },
  { src: '', alt: 'fourth' },
];
