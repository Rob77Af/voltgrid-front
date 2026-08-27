"use client";
import React from 'react'
import Link from 'next/link'



import Logo from './logo'
// css imported globally

const Footer = (props) => {
    return (
        <div className="footer-container1">
            <footer className="footer-thq-voltgrid-footer-root-elm voltgrid-footer-root">
                <div className="voltgrid-footer-inner">
                    <div className="voltgrid-footer-layout">
                        <div className="voltgrid-footer-copyright-group">
                            <div className="voltgrid-footer-brand-mark">
                                <Link href="/homepage">
                                    <div className="voltgrid-footer-logo-link">
                                        <Logo isOnDarkBackground={false}></Logo>
                                    </div>
                                </Link>
                            </div>
                            <div className="voltgrid-footer-legal-copy">
                                <div className="voltgrid-footer-icon-wrap">
                                    <svg
                                        fill="none"
                                        width="14"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="14"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle r="10" cx="12" cy="12"></circle>
                                        <path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path>
                                    </svg>
                                </div>
                                <span className="voltgrid-footer-year">2026</span>
                                <span className="voltgrid-footer-company">
                                    VoltGrid Telemetry. All rights reserved.
                                </span>
                            </div>
                        </div>
                        <nav aria-label="Legal navigation" className="voltgrid-footer-nav">
                            <ul className="voltgrid-footer-links">
                                <li className="voltgrid-footer-link-item">
                                    <span
                                        data-planned-page="Game Asset Details"
                                        className="voltgrid-footer-link-dummy"
                                    >
                                        Asset Registry
                                    </span>
                                </li>
                                <li className="voltgrid-footer-link-item">
                                    <Link href="/terms-conditions">
                                        <div className="voltgrid-footer-link">
                                            <span>Terms of Service</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="voltgrid-footer-link-item">
                                    <Link href="/terms-conditions">
                                        <div className="voltgrid-footer-link">
                                            <span>Privacy Policy</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
            <div className="footer-container2">
                <div className="footer-container3">
                    <script dangerouslySetInnerHTML={{ __html: `<script defer data-name="voltgrid-footer-interactions">
(function(){
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('.voltgrid-footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
})()
</script>` }} />
                </div>
            </div>
        </div>
    )
}

export default Footer
