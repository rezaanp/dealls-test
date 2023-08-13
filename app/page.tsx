"use client";
import React from "react";
//HOOKS
import { useGetAllProductByClient } from "@/hooks/index";
//COMPONENTS
import Text from "@/components/Text";
//THIRD PARTY
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllProductByClient();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>ERROR API</p>;
  return (
    <>
      <div>
        <Text type="subtitle" size="L" className="mb-5 text-slate-600">
          Product Stock & Price Chart
        </Text>
        <BarChart width={3000} height={500} data={data?.products}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#761CEC" />
          <Bar dataKey="price" fill="#c084fc" />
        </BarChart>
      </div>
    </>
  );
};

export default Dashboard;
