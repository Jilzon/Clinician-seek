import React, { useEffect, useState } from "react";
import "./_autocomplete.scss";
export default function AutoComplete({
  searchValue,
  onSearch,
  options,
  showOptions,
  componentClass,
  inputFieldClass,
  placeHolder,
  setShowOptions
}) {
  const [filterOptions, setFilterOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(showOptions);
  }, [showOptions]);
  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    setFilterOptions(
      search !== ""
        ? options.filter(
            (suggestion) =>
              suggestion.toLowerCase().indexOf(search?.toLowerCase()) > -1
          )
        : []
    );
  }, [search]);

  return (
    <div
      className={`auto-complete relative ${
        componentClass ? componentClass : ""
      }`}
    >
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowOptions(true);
        }}
        type="text"
        className={inputFieldClass ? `${inputFieldClass}` : ``}
        placeholder={placeHolder ? placeHolder : ""}
      />
      {show && filterOptions.length > 0 && (
        <ul className="absolute auto-complete-list  max-h-52 overflow-auto z-[999] w-full top-[87px] rounded-tl-0 rounded-tr-0 rounded-bl-[20px] rounded-br-[20px] py-[35px] shadow-md bg-[#FFFFFF] text-[#828282]">
          {filterOptions.map((option, i) => (
            <li
              key={i}
              className="cursor-pointer py-2 hover:bg-clr-btn hover:text-white px-6"
              onClick={() => {
                onSearch(option);
              }}
            >
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
