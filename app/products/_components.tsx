//COMPONENTS
import Text from "@/components/Text";
import Button from "@/components/Button";
import { InputSelect, InputText } from "@/components/Input";
//THIRD PARTY
import clsx from "classnames";
import { LuFilter, LuFilterX } from "react-icons/lu";
import MultiRangeSlider from "multi-range-slider-react";

//TYPES
interface ProductFilterProps {
  brand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface ButtonProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilter: boolean;
}

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataFilter: ProductFilterProps;
  setDataFilter: React.Dispatch<React.SetStateAction<ProductFilterProps>>;
  handleSubmit: any;
  options?: string[];
  isFilter: boolean;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonFilter = ({ setIsModalOpen, isFilter }: ButtonProps) => {
  const icon = isFilter ? <LuFilterX /> : <LuFilter />;
  return (
    <div className="flex lg:justify-end mb-3">
      <div
        onClick={() => setIsModalOpen((current) => !current)}
        className={clsx(
          isFilter
            ? "text-white bg-violet-600 border-violet-600 hover:bg-violet-700 hover:text-white"
            : "text-violet-500 border-violet-400 hover:bg-violet-400 hover:text-white",
          "cursor-pointer py-[5px] flex gap-5 items-center rounded-lg w-fit px-7 border-[3px]"
        )}
      >
        <Text>{isFilter ? "Edit Filter" : "Filter Product"}</Text>
        {icon}
      </div>
    </div>
  );
};

export const ModalFilter: React.FC<ModalProps> = ({
  setIsModalOpen,
  dataFilter,
  setDataFilter,
  handleSubmit,
  options,
  isFilter,
  setIsFilter,
}) => {
  const handleCancel = () => {
    if (!isFilter) {
      setDataFilter({
        brand: "",
        category: "",
        minPrice: 0,
        maxPrice: 1800,
      });
    }
    setIsModalOpen(false);
  };

  const handleResetFilter = () => {
    setIsModalOpen(false), setIsFilter(false);
    setDataFilter({
      brand: "",
      category: "",
      minPrice: 0,
      maxPrice: 1800,
    });
  };
  return (
    <div className="absolute h-full w-full bg-black bg-opacity-80 flex items-center justify-center top-0 left-0 z-50">
      <div className="w-11/12 sm:w-2/3 lg:w-2/6 overflow-auto bg-white rounded-lg p-5">
        <Text size="L">Filter Products</Text>
        <p className="text-[10px] text-slate-500 text">* Empty Value = ALL</p>
        <div className="w-full flex flex-col gap-6 my-5">
          <InputText
            placeholder="Enter Brand"
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setDataFilter({ ...dataFilter, brand: value?.target?.value })
            }
            value={dataFilter?.brand}
          />

          <InputSelect
            placeholder="Choose Category"
            options={options ?? []}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setDataFilter({ ...dataFilter, category: value?.target?.value })
            }
            value={dataFilter?.category}
          />
          <div className="flex flex-col gap-3">
            <Text>Price Range</Text>
            <MultiRangeSlider
              min={0}
              max={1800}
              step={1}
              style={{ padding: "20px" }}
              label="true"
              ruler="false"
              barLeftColor="white"
              barInnerColor="#c4b5fd"
              barRightColor="white"
              thumbLeftColor="#94a3b8"
              thumbRightColor="#94a3b8"
              minValue={dataFilter?.minPrice}
              maxValue={dataFilter?.maxPrice}
              onChange={(value: { minValue: number; maxValue: number }) =>
                setDataFilter({
                  ...dataFilter,
                  minPrice: value?.minValue,
                  maxPrice: value?.maxValue,
                })
              }
            />
            <div className="flex justify-between px-3">
              <p className="text-sm">{`$ ${dataFilter?.minPrice}`}</p>
              <p className="text-sm">{`$ ${dataFilter?.maxPrice}`}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            {isFilter && (
              <Button
                className="w-fit bg-red-500 border-rose-500 hover:bg-red-600 hover:border-red-600 text-white"
                variant="outlined"
                onClick={handleResetFilter}
              >
                Reset Filter
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              className="w-fit bg-white-500 border-violet-500 hover:bg-white hover:border-violet-300 hover:text-slate-500"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="w-fit bg-violet-500 border-violet-500 hover:bg-violet-700 hover:border-violet-700 text-white"
              variant="outlined"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
