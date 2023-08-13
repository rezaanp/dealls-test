"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
//HOOKS
import {
  useGetProducts,
  useGetProductCategories,
  useGetAllProductByClient,
} from "@/hooks/index";
//UTILS
import { numberSeparator } from "@/utils/index";
//COMPONENTS
import Text from "@/components/Text";
import { ButtonFilter, ModalFilter } from "@/product/_components";
//THIRD PARTY
import { useDebounce } from "use-debounce";

//TYPES
interface ProductFilterProps {
  brand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

//COLUMNS
const columns = [
  { title: "Product Name", key: "title" },
  { title: "Brand", key: "brand" },
  {
    title: "Price",
    component: ({ data }: any) => (
      <span>{`$ ${numberSeparator(data?.price)}`}</span>
    ),
  },
  { title: "Stock", key: "stock" },
  { title: "Category", key: "category" },
];

const Products = () => {
  //QUERY
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 300);
  const { data: products } = useGetProducts({ skip, q: value });
  const { data: allProducts } = useGetAllProductByClient();
  const { data: categories } = useGetProductCategories();

  //LOCAl STATE
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [dataFilter, setDataFilter] = useState<ProductFilterProps>({
    brand: "",
    category: "",
    minPrice: 0,
    maxPrice: 1800,
  });

  //SIDE EFFECT
  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      (document.documentElement.style.overflow = "hidden"),
        (document.body.style.overflow = "hidden");
    } else {
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    }
  }, [isModalOpen]);

  //FUNCTIONS
  const handleSubmitFilter = () => {
    const filterResult = allProducts?.products?.filter((product: any) => {
      const brandMatch = !dataFilter.brand
        ? true
        : product.brand.toLowerCase() === dataFilter.brand.toLowerCase();

      const categoryMatch =
        !dataFilter.category || product.category === dataFilter.category;

      const priceMatch =
        product?.price >= dataFilter?.minPrice &&
        product?.price <= dataFilter?.maxPrice;

      return brandMatch && categoryMatch && priceMatch;
    });
    setSkip(0);
    setSearch("");
    setIsFilter(true);
    setIsModalOpen(false);
    setProductsFiltered(filterResult);
  };

  return (
    <>
      <Text type="subtitle" size="L" className="mb-5 text-slate-600">
        List Products
      </Text>
      <ButtonFilter setIsModalOpen={setIsModalOpen} isFilter={isFilter} />
      {isFilter && !isModalOpen && (
        <div className="flex lg:justify-end">
          <div className="p-3 bg-slate-100 flex gap-3 rounded-lg mb-3 border-2 border-slate-700 border-dashed w-fit">
            {[
              { label: "Brand", key: "brand" },
              { label: "Category", key: "category" },
              { label: "Min. Price", key: "minPrice" },
              { label: "Max. Price", key: "maxPrice" },
            ]?.map((e: any) => (
              <div className="bg-violet-500 text-white flex p-2 rounded-xl text-xs">
                {`${e?.label} : ${
                  dataFilter[e?.key as keyof ProductFilterProps] === ""
                    ? "All"
                    : dataFilter[e?.key as keyof ProductFilterProps]
                }`}
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalFilter
          setIsModalOpen={setIsModalOpen}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
          handleSubmit={handleSubmitFilter}
          options={categories}
          isFilter={isFilter}
          setIsFilter={setIsFilter}
        />
      )}
      <Table
        columns={columns}
        datas={isFilter ? productsFiltered : products?.products}
        skip={isFilter ? undefined : skip}
        setSkip={setSkip}
        search={isFilter ? undefined : search}
        setSearch={setSearch}
        totalData={products?.total}
        placeholderSearch="Search Product"
      />
    </>
  );
};

export default Products;
