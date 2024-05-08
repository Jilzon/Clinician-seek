"use client";
import React, { useEffect, useState } from "react";
import "./_banner.scss";
import { verifiedIcon } from "@/app/icons";
export default function Banner({
  active,
  closeBanner,
  bannerContent,
  autoHide,
  customClass
}) {
  const [bannerOpen, setBannerOpen] = useState(active);

  useEffect(() => {
    setBannerOpen(active);
    if (active && autoHide) {
      var timeout = setTimeout(() => {
        closeBanner(false);
      }, 5000);
    }
  }, [active]);
  return (
    <>
      {bannerOpen && (
        <div
          className={`toast ${active ? `active` : ``} ${
            customClass ? customClass : ""
          }`}
        >
          <div className="toast-content">
            <div className="message">
              {verifiedIcon}
              <div>
                {/* <span class="text text-1">Success</span> */}
                <span className="text text-2">
                  {bannerContent && bannerContent}
                </span>
              </div>
            </div>
          </div>
          <span className="close" onClick={() => closeBanner(false)}>
            &times;
          </span>
          <div className={`progress ${autoHide ? `auto-hide` : ``}`}></div>
        </div>
      )}
    </>
  );
}
