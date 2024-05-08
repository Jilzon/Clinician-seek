"use client";
import { DropdownIconAnimated } from "@/app/icons";
import React, { useState } from "react";
import "./accordion.scss";
const Accordion = ({ data, customClass, callback }) => {
  const [isActive, setIsActive] = useState(null);

  return (
    <div className={`accordion w-full ${customClass}`}>
      {data &&
        data.map((accordionItem, k) => (
          <div key={k} className="accordion-item pr-[49px]">
            <div
              className={`accordion-title cursor-pointer flex justify-between uppercase text-[#018893] text-lg leading-[1.91rem] mt-9 pb-2 border-b border-solid border-b-[#9CD2E0] active--${
                isActive == k
              }`}
              onClick={() => setIsActive((prev) => (prev == k ? null : k))}
            >
              {accordionItem?.title && <div>{accordionItem.title}</div>}
              <div>
                <DropdownIconAnimated isOpen={isActive == k} />
              </div>
            </div>
            {isActive == k && accordionItem?.content && (
              <div className="accordion-content pt-[27px]">
                {typeof accordionItem?.content == "string" ? (
                  <div className="text-[#828282] text-left">
                    {accordionItem.content}
                  </div>
                ) : (
                  accordionItem.content.map((item, i) => (
                    <div
                      key={i}
                      className="text-[#828282] flex justify-between"
                      onClick={
                        callback
                          ? (e) => callback(item?.text, accordionItem.type)
                          : () => {}
                      }
                    >
                      <div className="text-nowrap pb-2">{item?.text}</div>
                      <div className="pb-2 ">{item?.count}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Accordion;
