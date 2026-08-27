"use client";
import React from 'react'




// css imported globally

const Logo = (props) => {
    return (
        <div className="logo-container1">
            {props.isOnDarkBackground === false && (
                <div className="logo-thq-voltgrid-logo-light-elm voltgrid-logo-light">
                    <div className="logo-lockup">
                        <div className="logo-mark">
                            <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                className="logo-glyph"
                            >
                                <path
                                    d="M18 4L8 18H16L14 28L24 14H16L18 4Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                ></path>
                                <rect
                                    x="2"
                                    y="2"
                                    width="28"
                                    height="28"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="2 4"
                                ></rect>
                            </svg>
                        </div>
                        <div className="logo-text-group">
                            <span className="logo-brand">VOLTGRID</span>
                            <span className="logo-tagline">RACING SYSTEMS</span>
                        </div>
                    </div>
                </div>
            )}
            {props.isOnDarkBackground === true && (
                <div className="logo-thq-voltgrid-logo-dark-elm voltgrid-logo-dark">
                    <div className="logo-lockup">
                        <div className="logo-mark">
                            <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                className="logo-glyph"
                            >
                                <path
                                    d="M18 4L8 18H16L14 28L24 14H16L18 4Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                ></path>
                                <rect
                                    x="2"
                                    y="2"
                                    width="28"
                                    height="28"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="2 4"
                                ></rect>
                            </svg>
                        </div>
                        <div className="logo-text-group">
                            <span className="logo-brand">VOLTGRID</span>
                            <span className="logo-tagline">RACING SYSTEMS</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="logo-container2">
                <div className="logo-container3">
                    <script dangerouslySetInnerHTML={{ __html: `<script defer data-name="voltgrid-logo-logic">
(function(){
document.addEventListener('DOMContentLoaded', () => {
  /* Logo interaction logic if needed in future */
});
})()
</script>` }} />
                </div>
            </div>
            <div className="logo-container4">
                <div className="logo-container5">
                    <script dangerouslySetInnerHTML={{ __html: `<style>
[data-tq-logo-variant] {
  flex-shrink: 0;
}
[data-tq-logo-variant], [data-tq-logo-variant] * {
  white-space: nowrap;
}
</style>` }} />
                </div>
            </div>
        </div>
    )
}





export default Logo
