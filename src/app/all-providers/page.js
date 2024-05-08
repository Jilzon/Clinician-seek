"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/card";
import "./_all-providers.scss";
import axios from "@/helpers/axios";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import DropdownList from "@/components/dropdownList";
import Loader from "@/components/Loader/Loader";
function ProviderList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(12);
  const [nextPage, setNextPage] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [searchprovider, setSearchProvider] = useState("");
  const [filteredOptions, setFilteredOptions] = useState({
    location: [],
    specialization: [],
    pay_mode: [],
    age_category: []
  });
  const [dynamicFilter, setDynamicFilter] = useState({
    location: [],
    specialization: [],
    pay_mode: [],
    age_category: []
  });
  useEffect(() => {
    setloading(true);
    try {
      axios
        .post(`provider/get-tags`, JSON.stringify(dynamicFilter))
        .then(function (response) {
          setFilteredOptions({
            location: [
              ...new Set([
                ...response?.data?.data[0]?.location?.map((item) => item?.name),
                ...response?.data?.data[0]?.state?.map((item) => item?.name),
                ...response?.data?.data[0]?.city?.map((item) => item?.name)
              ])
            ],
            specialization: response?.data?.data[0]?.specialization,
            pay_mode: response?.data?.data[0]?.payMode
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
    try {
      axios
        .get(
          `provider/get-provider-listing/?page_no=${pageNumber}&page_limit=${pageLimit}${
            searchprovider ? `${searchprovider}` : ``
          }`
        )
        .then(function (response) {
          setTotalPages(response?.data?.pagination?.total_pages);
          setCardData(
            response?.data?.data?.map((item) => ({
              id: item?._id,
              slug: item?.provider?.slug,
              status: item?.provider?.tag,
              profile: true,
              name: item.name,
              cardTitle: `${item.name},${item.provider.qualification}`,
              cardSubTitle: item.provider.designation,
              // cardDescription: item.provider.bio,
              clinicianImage: item.profile_pic_url,
              list: [
                {
                  title: "Specialize In:",
                  type: "list",
                  data: item?.provider?.specialization.map((item) => item.name)
                },
                {
                  title: "Accepted Payment",
                  type: "badge",
                  data: item?.provider?.acceptable_pay_modes.map(
                    (item) => item.name
                  )
                }
              ]
            }))
          );
          setNextPage(response?.data?.pagination?.next_page);
          setCurrentPage(response.data.pagination.current_page);
          if (response?.data?.pagination?.next_page !== null) {
            setPageNumber(response.data.pagination.next_page);
          }
          setloading(false);
        })
        .catch(function (error) {
          setloading(false);
          console.log(error);
        });
    } catch (error) {}
  }, [dynamicFilter]);
  const handlePageChange = (newPage) => {
    if (!loading) {
      if (nextPage !== null || newPage < totalPages) {
        axios
          .get(
            `provider/get-provider-listing/?page_no=${newPage}&page_limit=${pageLimit}${
              searchprovider ? `${searchprovider}` : ``
            }`
          )
          .then(function (response) {
            setCardData(
              response?.data?.data?.map((item) => ({
                id: item?._id,
                slug: item?.provider?.slug,
                status: item?.provider?.tag,
                profile: true,
                name: item.name,
                cardTitle: `${item.name},${item.provider.qualification}`,
                cardSubTitle: item.provider.designation,
                // cardDescription: item.provider.bio,
                clinicianImage: item.profile_pic_url,
                list: [
                  {
                    title: "Specialize In:",
                    type: "list",
                    data: item?.provider?.specialization.map(
                      (item) => item.name
                    )
                  },
                  {
                    title: "Accepted Payment",
                    type: "badge",
                    data: item?.provider?.acceptable_pay_modes.map(
                      (item) => item.name
                    )
                  }
                ]
              }))
            );
            setNextPage(response?.data?.pagination?.next_page);
            setCurrentPage(response.data.pagination.current_page);
            if (response?.data?.pagination?.next_page !== null) {
              setPageNumber(response.data.pagination.next_page);
            }
          })
          .catch(function (error) {
            setloading(false);
            console.log(error);
          });
      }
    }
  };
  return (
    <>
      <section className="relative all-providers">
        <div className="max-w-full overflow-hidden">
          <div className="container relative">
            <div className="absolute -top-[26%] -left-[55%] sm:-left-[25%] sm:-top-[10%]">
              <svg
                width="1065"
                height="737"
                viewBox="0 0 1065 737"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M552.755 596.299C848.152 515.389 876.923 -142.316 596.142 -274.753C329.205 -400.659 -142.081 -31.509 -91.7988 242.021C-45.5099 493.826 369.405 646.519 552.755 596.299Z"
                  fill="#D1F5C7"
                />
                <path
                  d="M782.779 -125.265C619.781 -344.682 63.5522 -155.487 44.409 120.907C26.2098 383.672 485.884 655.947 697.041 525.503C891.427 405.419 883.951 10.9242 782.779 -125.265Z"
                  stroke="#82C29B"
                />
              </svg>
            </div>
          </div>
          <div className="container mt-40 md:mt-60 mb-16">
            <DropdownList
              title="Providers"
              filterTags={filterTags}
              filterParams={searchprovider}
              dynamicFilter={dynamicFilter}
              filteredOptions={filteredOptions}
              callback={{
                searchParams: setSearchProvider,
                setFilterTags: setFilterTags,
                setPage: setPageNumber,
                setDynamicFilter: setDynamicFilter
              }}
            />
            {loading && <Loader animation="dots" classes="mt-8 mx-auto" />}
            <div className="grid relative grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-0 gap-y-20 mt-24 mb-10 justify-center">
              {cardData.map((item, i) => (
                <Card key={i} cardList={item} />
              ))}
            </div>
            {cardData.length > 0 && !loading && (
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={(newPage) => handlePageChange(newPage)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default ProviderList;
