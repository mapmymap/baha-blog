import React from 'react';
import Container from '@/app/_components/container';
import SocialLinks from '@/app/_components/social-links';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://www.facebook.com/profile.php?id=61555946670515',
    svg: <FaFacebook />,
    label: 'Facebook page',
  },
  {
    href: 'https://www.instagram.com/bahatravels?igsh=bnFmOXV5ZzN1YWIy',
    svg: <FaInstagram />,
    label: 'Instagram Page',
  },
  {
    href: 'https://wa.me/+917385330961',
    svg: <FaWhatsapp />,
    label: 'Whatsapp Chat',
  },
];

const Footer = () => {
  return (
    <footer className="flex w-full flex-grow py-2 bg-gray-100 dark:bg-gray-800">
      <Container className="mx-auto w-full max-w-screen-xl p-2 py-0 lg:py-2 flex flex-col justify-between">
        <Container className="sm:flex sm:items-center sm:justify-between">
          <Container className="flex items-center justify-center gap-4">
            <span className="text-bold text-gray-950 sm:text-center text-xs dark:text-gray-600">
              © 2024{' '}
              <a href="#" className="hover:underline">
                Baha™
              </a>
              All Rights Reserved.
            </span>
          </Container>
          <Container className="flex items-center justify-center gap-4">
            <span className="text-bold text-gray-950 sm:text-center text-xs dark:text-gray-600">
              CIN{' '}
              <a href="#" className="hover:underline">
                U79110KA2023PTC175268
              </a>
            </span>
          </Container>
          <Container className=" flex justify-center mt-0">
            {socialLinks.map((link, index) => (
              <SocialLinks
                key={index}
                href={link.href}
                svg={link.svg}
                label={link.label}
              />
            ))}
          </Container>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
