type SocialLinkProps = {
  href: string;
  svg: React.ReactNode;
  label: string;
};

const SocialLinks = ({ href, svg, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    className="text-brand hover:text-gray-800 ms-5"
  >
    {svg}
    <span className="sr-only">{label}</span>
  </a>
);

export default SocialLinks;
