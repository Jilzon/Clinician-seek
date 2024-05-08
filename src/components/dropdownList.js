"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  specialtyIcon,
  dropdownIcon,
  moneyIcon,
  filterIcon
} from "@/app/icons";
import Drawer from "./Drawer";
import Accordion from "./Accordion/accordion";
import AutoComplete from "./AutoComplete/AutoComplete";
export default function DropdownList({
  title,
  filterTags,
  callback,
  filterParams,
  filteredOptions,
  dynamicFilter
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [accordionData, setAccordionData] = useState([]);

  const [speciality, setSpecialty] = useState([]);
  const [payType, setPayType] = useState([]);
  const [showLocation, setShowLocation] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState("");
  const [optionList, setOptionList] = useState({});
  const drawerRef = useRef();

  // useEffect(() => {
  //   setSpecialty(specializations);
  // }, [specializations]);
  // useEffect(() => {
  //   setPayType(payModes);
  // }, [payModes]);
  useEffect(() => {
    setOptionList(filteredOptions);
    setAccordionData([
      {
        title: "Payment Method",
        type: "pay_mode",
        content: filteredOptions?.pay_mode?.map((item) => ({
          text: item.name,
          count: item.count
        }))
      },
      {
        title: "Specialty",
        type: "specialization",
        content: filteredOptions?.specialization?.map((item) => ({
          text: item.name,
          count: item.count
        }))
      },
      {
        title: "Location",
        type: "location",
        content: filteredOptions?.location?.map((item) => ({ text: item }))
      }
    ]);
  }, [filteredOptions]);

  const openFilterList = () => {
    setOpenFilter(true);
  };
  // const accordionData = [
  //   {
  //     title: "Payment Method",
  //     content: [
  //       { text: "Self pay (Cash)", count: 1 },
  //       { text: "Cheque", count: 4 },
  //       { text: "Credit Card", count: 8 }
  //     ]
  //   },
  //   {
  //     title: "Specialty",
  //     content: [
  //       { text: "Self pay (Cash)", count: 1 },
  //       { text: "Cheque", count: 4 },
  //       { text: "Credit Card", count: 8 }
  //     ]
  //   },
  //   {
  //     title: "Location",
  //     content: [
  //       { text: "Self pay (Cash)", count: 1 },
  //       { text: "Cheque", count: 4 },
  //       { text: "Credit Card", count: 8 }
  //     ]
  //   }
  // ];
  const handleChange = (e) => {
    // console.log(filterTags, locationOptions);
    // console.log(selectedLocations, e);
    if (e !== "") {
      setSelectedLocations(e);
    }
    var removeSearchParams = filterParams.replace(
      `&location=${selectedLocations}`,
      ``
    );
    setShowLocation(false);
    setSearchValue(e);
    var removeOldLocation = filterTags.filter((f) => f !== selectedLocations);
    if (!filterTags.includes(e)) {
      // if (e == "") {
      //   var filterLocationTag = filterTags.filter(
      //     (f) => !locationOptions.includes(f)
      //   );
      //   callback.setFilterTags(filterLocationTag);
      // } else {
      //   callback.setFilterTags([...filterTags, e]);
      // }
      callback?.setFilterTags([...removeOldLocation, e]);
      callback?.setPage(1);
      callback?.searchParams(`${removeSearchParams}&location=${e}`);
      callback?.setDynamicFilter({
        ...dynamicFilter,
        location: [e]
      });
    }
  };
  const handleSpecialties = (e) => {
    if (!filterTags.includes(e)) {
      callback?.setFilterTags([...filterTags, e]);
      callback?.setPage(1);
      callback?.searchParams(`${filterParams}&speciality=${e}`);
      callback?.setDynamicFilter({
        ...dynamicFilter,
        specialization: [...dynamicFilter.specialization, e]
      });
    }
  };
  const handlePaymentMethods = (e) => {
    if (!filterTags.includes(e)) {
      callback?.setFilterTags([...filterTags, e]);
      callback?.setPage(1);
      callback?.searchParams(`${filterParams}&pay_type=${e}`);
      callback?.setDynamicFilter({
        ...dynamicFilter,
        pay_mode: [...dynamicFilter.pay_mode, e]
      });
    }
  };
  const removeTag = (value, i) => {
    const tags = [...filterTags];
    tags.splice(i, 1);
    // const expression = `/(&location=${value})|(&pay_type=${value})|(&speciality=${value})/`;
    // const removeSearchParams = filterParams.replace(expression, ``);
    var removeSearchParams = filterParams;
    removeSearchParams = removeSearchParams.replace(`&location=${value}`, ``);
    removeSearchParams = removeSearchParams.replace(`&pay_type=${value}`, ``);
    removeSearchParams = removeSearchParams.replace(`&speciality=${value}`, ``);
    // console.log("filtered", removeSearchParams);
    callback?.setFilterTags(tags);
    callback?.setPage(1);
    callback?.searchParams(removeSearchParams);
    for (const key in dynamicFilter) {
      if (dynamicFilter[key].includes(value)) {
        callback?.setDynamicFilter({
          ...dynamicFilter,
          [key]: dynamicFilter[key].filter((f) => f !== value)
        });
      }
    }
  };
  const accordionCallback = (e, type) => {
    callback?.setPage(1);
    if (!filterTags.includes(e)) {
      if (type !== "location") {
        callback?.setFilterTags([...filterTags, e]);
        var paramType = type;
        switch (type) {
          case "pay_mode":
            paramType = "pay_type";

            break;
          case "specialization":
            paramType = "speciality";
            break;
          default:
            break;
        }
        callback?.searchParams(`${filterParams}&${paramType}=${e}`);
        callback?.setDynamicFilter({
          ...dynamicFilter,
          [type]: [...dynamicFilter[type], e]
        });
      } else {
        setSelectedLocations(e);
        var removeOldLocation = filterTags.filter(
          (f) => f !== selectedLocations
        );

        callback?.setFilterTags([...removeOldLocation, e]);
        var removeSearchParams = filterParams.replace(
          `&location=${selectedLocations}`,
          ``
        );
        callback?.searchParams(`${removeSearchParams}&location=${e}`);
        callback?.setDynamicFilter({
          ...dynamicFilter,
          location: [e]
        });
      }
    }
  };
  const clearFilter = (e) => {
    setShowLocation(true);
    setSearchValue("");
    callback?.setFilterTags([]);
    callback?.setPage(1);
    callback?.searchParams(``);
    callback?.setDynamicFilter({
      location: [],
      specialization: [],
      pay_mode: [],
      age_category: []
    });
  };
  return (
    <div className="mt-[89px] relative">
      <Drawer
        // ref={drawerRef}
        open={openFilter}
        setOpen={setOpenFilter}
        customClass="bg-[#00000080] mobile-filter-drawer"
        fullWidth
      >
        <div className="bg-white pl-4 pb-[41px] rounded-bl-[22px] rounded-br-[22px] text-right">
          <div className="filter-tags flex flex-wrap gap-[1.063rem] mb-[65px] font-bold text-[#018893] leading-[1.159rem] text-xs">
            {filterTags &&
              filterTags.length > 0 &&
              filterTags.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem]"
                >
                  {item}
                  <button
                    className="ml-5 bg-transparent border-none pointer-events-auto"
                    onClick={() => removeTag(item, i)}
                  >
                    x
                  </button>
                </div>
              ))}
            {/* <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem]">
              New York
              <button className="ml-5 bg-transparent border-none">x</button>
            </div>
            <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem]">
              Eating Disorder
              <button className="ml-5 bg-transparent border-none">x</button>
            </div>
            <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem]">
              Self Pay (Cash)
              <button className="ml-5 bg-transparent border-none">x</button>
            </div> */}
          </div>
          <div className="accordion-wrapper overflow-y-auto h-[230px]">
            <Accordion data={accordionData} callback={accordionCallback} />
          </div>
        </div>
      </Drawer>
      <div className="mobile-filter text-[#018893] bg-inherit font-medium text-lg flex justify-between xl:hidden border border-solid border-[#018893] rounded-lg py-5 px-7 mb-[61px]">
        <button className="flex gap-3 items-center" onClick={openFilterList}>
          {filterIcon}
          <span>FILTER</span>
        </button>
        <button onClick={(e) => clearFilter(e.target.value)}>
          Clear All Filters
        </button>
      </div>
      <div>
        {title && (
          <h3 className="hidden xl:block font-medium text-4xl leading-[3.15rem] text-[#2B3D67]">
            {title}
          </h3>
        )}
        <nav className="hidden xl:inline-block mt-6 xl:w-[1110px]">
          <ul className="border border-solid border-[#018893] flex text-lg">
            <li className="inline-block border-r border-solid border-r-[#018893] bg-white">
              {/* <input
                type="text"
                placeholder="My Location, City, or State"
                value={searchValue}
                onChange={(e) => handleChange(e.target.value)}
                className="location text-[#828282] pt-[30px] pb-[28px] pl-[74px]  outline-none xl:w-[400px]"
              /> */}
              <AutoComplete
                options={optionList?.location}
                searchValue={searchValue}
                placeHolder="My Location, City, or State"
                inputFieldClass="location text-[#828282] pt-[30px] pb-[28px] pl-[74px] outline-none xl:w-[400px]"
                onSearch={handleChange}
                showOptions={showLocation}
                setShowOptions={setShowLocation}
              />
            </li>
            <li className="inline-block bg-white pt-[26px] pb-[27px] pl-[20px] xl:pl-[89px] group/specialty relative border-r border-solid border-r-[#018893] lg:w-[341px]">
              <div className="flex gap-5 items-center">
                {specialtyIcon}
                <span className="text-[#828282]">Specialty</span>
                {dropdownIcon}
              </div>
              {optionList?.specialization?.length > 0 && (
                <div className="z-[999] absolute left-[10%] group-hover/specialty:block dropdown-content w-auto hidden top-[87px]">
                  <div className="rounded-tl-0 rounded-tr-0 rounded-bl-[20px] rounded-br-[20px] py-[35px] shadow-md bg-[#FFFFFF] text-[#828282]">
                    {/* {specialties &&
              specialties.map((item) => (
                <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem]">
                  {item}
                  <button className="ml-5 bg-transparent border-none">x</button>
                </div>
              ))} */}
                    {optionList?.specialization?.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-[53px] py-2 cursor-pointer hover:bg-clr-btn hover:text-white pl-10 pr-[37px]"
                        onClick={(e) =>
                          handleSpecialties(item.name, "speciality")
                        }
                      >
                        <div className="text-nowrap w-1/2">{item?.name}</div>
                        <div className="block w-1/2 text-right">
                          {item?.count}
                        </div>
                      </div>
                    ))}
                    {/* <div className="flex gap-[53px]  cursor-pointer">
                    <div className="text-nowrap pb-2 w-1/2">
                      Binge-eating disorder
                    </div>
                    <div className="block pb-2 w-1/2 text-right">1</div>
                  </div>
                  <div className="flex gap-[53px]  cursor-pointer">
                    <div className="text-nowrap w-1/2">
                      Avoidant/Restrictive Food Intake Disorder (ARFID)
                    </div>
                    <div className="w-1/2 text-right">2</div>
                  </div> */}
                  </div>
                </div>
              )}
            </li>
            <li className="inline-block bg-white pt-[26px] pb-[27px] pl-[20px] xl:pl-[77px] group/payment relative">
              <div className="flex gap-5 items-center">
                {moneyIcon}
                <span className="text-[#828282]">Payment Method</span>
                {dropdownIcon}
              </div>
              {optionList?.pay_mode?.length > 0 && (
                <div className="z-[999] left-[10%] absolute group-hover/payment:block dropdown-content w-auto hidden top-[87px]">
                  <div className="rounded-tl-0 rounded-tr-0 rounded-bl-[20px] rounded-br-[20px] py-[35px] shadow-md bg-[#FFFFFF] text-[#828282]">
                    {/* <div className="flex gap-[53px]  cursor-pointer">
                    <div className="text-nowrap pb-2 w-1/2">
                      Self pay (Cash)
                    </div>
                    <div className="block pb-2 w-1/2 text-right">1</div>
                  </div>
                  <div className="flex gap-[53px]  cursor-pointer">
                    <div className="text-nowrap w-1/2 pb-2">Cheque</div>
                    <div className="w-1/2 text-right">2</div>
                  </div>
                  <div className="flex gap-[53px]  cursor-pointer">
                    <div className="text-nowrap w-1/2">Credit Card</div>
                    <div className="w-1/2 text-right">2</div>
                  </div> */}
                    {optionList?.pay_mode?.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-[53px] py-2 cursor-pointer hover:bg-clr-btn hover:text-white pl-10 pr-[37px]"
                        onClick={(e) =>
                          handlePaymentMethods(item.name, "pay_type")
                        }
                      >
                        <div className="text-nowrap w-1/2">{item?.name}</div>
                        <div className="block w-1/2 text-right">
                          {item?.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div className="hidden xl:flex gap-9 mt-3">
          {filterTags && filterTags.length > 0 && (
            <button
              onClick={(e) => clearFilter(e.target.value)}
              className="bg-inherit border-none px-3 py-1 font-medium text-[#018893] text-lg leading-[1.159rem]"
            >
              Clear All
            </button>
          )}
          {filterTags && filterTags.length > 0 && (
            <div className="tags flex flex-wrap gap-[1.063rem]">
              {filterTags.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-bold text-[#018893] text-xs leading-[1.159rem]"
                >
                  {item}
                  <button
                    className="ml-5 bg-transparent border-none"
                    onClick={() => removeTag(item, i)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* <div className="tags flex flex-wrap gap-[1.063rem]">
            <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-bold text-[#018893] text-xs leading-[1.159rem]">
              New York
              <button className="ml-5 bg-transparent border-none">x</button>
            </div>
            <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-bold text-[#018893] text-xs leading-[1.159rem]">
              New York
              <button className="ml-5 bg-transparent border-none">x</button>
            </div>
            <div className="bg-[#D8E7EB] px-3 py-1 rounded-[0.875rem] font-bold text-[#018893] text-xs leading-[1.159rem]">
              New York
              <button className="ml-5 bg-transparent border-none">x</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
