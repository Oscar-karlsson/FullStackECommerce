import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import styles from "../common/Footer.module.css";








const Footer = () => {
    const [showSection, setShowSection] = useState({ accounts: true, information: true, service: true });
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
            setShowSection({ accounts: !isSmallScreen, information: !isSmallScreen, service: !isSmallScreen });
        };

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSection = (section) => {
        if (isSmallScreen) {
            setShowSection({ ...showSection, [section]: !showSection[section] });
        }
    };


return (
    <>
   <footer className={styles.footer}>
                <div className={styles.footerSection}>
                    <h4 onClick={() => toggleSection('accounts')}>
                        KONTOSIDOR {isSmallScreen && (showSection.accounts ? <FaChevronUp /> : <FaChevronDown />)}
                    </h4>
                    {showSection.accounts && (
                        <ul>
                            <li><a href="#">Konto</a></li>
                            <li><a href="#">Orderhistorik</a></li>
                            <li><a href="#">Presentkort</a></li>
                            <li><a href="#">Personuppgifter</a></li>
                        </ul>
                    )}
                </div>
                <div className={styles.footerSection}>
                    <h4 onClick={() => toggleSection('information')}>
                        INFORMATION {isSmallScreen && (showSection.information ? <FaChevronUp /> : <FaChevronDown />)}
                    </h4>
                    {showSection.information && (
                        <ul>
                            <li><a href="#">Om HardwareHive</a></li>
                            <li><a href="#">Kontakt</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Jobba hos oss</a></li>
                        </ul>
                    )}
                </div>
                <div className={styles.footerSection}>
                    <h4 onClick={() => toggleSection('service')}>
                        SERVICE {isSmallScreen && (showSection.service ? <FaChevronUp /> : <FaChevronDown />)}
                    </h4>
                    {showSection.service && (
                        <ul>
                            <li><a href="#">Kundservice</a></li>
                            <li><a href="#">Retur & reklamation</a></li>
                            <li><a href="#">Frakt & leverans</a></li>
                            <li><a href="#">Villkor & info</a></li>
                        </ul>
                    )}
                </div>
        <div className={styles.footerSection}>
        <div className={styles.logoContainer}>
    <img src={logo} alt="Logo" className={styles.logo} />
    <p>HardwareHive skickar beställda varor inom 24 timmar om de finns i vårt webblager. Alla priser är i svenska kronor inklusive moms och gäller även i butik.</p>
</div>
        </div>
    </footer>
    <div className={styles.secondaryFooter}>
    <a href="#"  rel="noopener noreferrer">
        <FaFacebook />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaTwitter />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaInstagram />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaLinkedin />
    </a>
</div>
</>

);
};

export default Footer;