import React from 'react';
import styles from './Footer.module.css';
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
} from 'react-icons/ti';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social}>
        <li>
          <a href="/">
            <TiSocialFacebook />
          </a>
        </li>
        <li>
          <a href="/">
            <TiSocialInstagram />
          </a>
        </li>
        <li>
          <a href="/">
            <TiSocialLinkedin />
          </a>
        </li>
      </ul>
      <p>GroupComp. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
