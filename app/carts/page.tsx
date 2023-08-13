"use client";
import Link from "next/link";
import React, { useState } from "react";
import Table from "@/components/Table";
//HOOKS
import { useGetCarts } from "@/hooks/index";
//UTILS
import { numberSeparator } from "@/utils/index";
//COMPONENTS
import Text from "@/components/Text";

//COLUMNS
const columns = [
  { title: "Cart ID", key: "id" },
  { title: "Users ID", key: "userId" },
  { title: "Total Products", key: "totalProducts" },
  { title: "Total Quantity", key: "totalQuantity" },
  {
    title: "Total Amount",
    component: ({ data }: any) => <span>$ {numberSeparator(data?.total)}</span>,
  },
  {
    title: "Action",
    component: ({ data }: any) => (
      <Link
        href={`carts/${data?.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    ),
  },
];

const Carts = () => {
  //GET CARTS
  const [skip, setSkip] = useState<number>(0);
  const { data, isLoading, isError } = useGetCarts({ skip });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>ERROR API</p>;
  return (
    <>
      <div className="px-2">
        <Text type="subtitle" size="L" className="mb-5 text-slate-600">
          List Carts
        </Text>
        <Table
          columns={columns}
          datas={data?.carts}
          skip={skip}
          setSkip={setSkip}
          totalData={data?.total}
        />
      </div>
    </>
  );
};

export default Carts;
