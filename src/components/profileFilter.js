import DropdownList from "./dropdownList";
import ContextCreator from "./contextCreator/contextCreator";
import CardSlider from "./cardSlider";
import { backgroundIcon } from "@/app/icons";
import Loader from "./Loader/Loader";
export default function ProfileFilter({
  sliderSettings,
  setSlideContent,
  dropdownTitle,
  filterParams,
  setFilterParams,
  filterTags,
  loading,
  filteredOptions,
  dynamicFilter
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className={`absolute -z-10 -left-[157px] top-[62px] hidden ${
          setSlideContent?.length > 0 ? `md:block` : ``
        }`}
      >
        {backgroundIcon}
      </div>
      <div className="container xl:min-h-[507px]">
        {/* <ContextCreator> */}
        <DropdownList
          title={dropdownTitle}
          callback={setFilterParams}
          filterTags={filterTags}
          filterParams={filterParams}
          filteredOptions={filteredOptions}
          dynamicFilter={dynamicFilter}
        />
        {loading && <Loader animation="dots" classes="mt-8 mx-auto" />}
        {!loading && setSlideContent?.length > 0 && (
          <CardSlider
            slideContent={setSlideContent}
            sliderSettings={sliderSettings}
          />
        )}

        {/* </ContextCreator> */}
      </div>
    </section>
  );
}
