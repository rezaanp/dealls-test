import Link from "next/link";
//COMPONENTS
import Text from "@/components/Text";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { numberSeparator } from "@/utils/index";
//HOOKS
import {
  useGetDetailCarts,
  useGetUsers,
  useGetAllProductsByServer,
} from "@/hooks/index";

//TYPES
interface DetailCart {
  params: { cartId: number };
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
  { title: "Quantity", key: "quantity" },
  {
    title: "Total Amount",
    component: ({ data }: any) => (
      <span>{`$ ${numberSeparator(data?.totalAmount)}`}</span>
    ),
  },
];

const DetailCart = async ({ params }: DetailCart) => {
  //FETCH DATA
  const dataUsers = await useGetUsers();
  const dataAllProducts = await useGetAllProductsByServer();
  const dataCart = await useGetDetailCarts(params?.cartId);

  //FILTERING DATA
  const detailUser =
    dataUsers?.users?.find((user: any) => dataCart?.userId === user?.id) ?? [];

  const dataProductsByCart = dataAllProducts?.products?.filter(
    (product: any) =>
      dataCart?.products?.some(
        (productCart: any) => product?.id === productCart?.id
      ) ?? []
  );

  const orderedDataProduct = dataCart?.products?.map(
    (cart: any, index: number) => {
      const matchingProduct = dataProductsByCart?.find(
        (product: any) => cart.id === product.id
      );
      return {
        ...matchingProduct,
        quantity: cart?.quantity,
        totalAmount: cart?.total,
      };
    }
  );

  return (
    <>
      <div className="p-5 rounded-xl border-[3px] bg-slate-100 border-violet-950 grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-1/2 mb-7">
        <div className="col-span-1">
          <Text type="body" size="M" className="text-violet-950">
            {`User : ${detailUser?.firstName} ${detailUser?.lastName}`}
          </Text>
        </div>
        <div className="col-span-1 ">
          <Text type="body" size="M" className="text-violet-950">
            {`Quantity Of Item : ${dataCart?.totalQuantity}`}
          </Text>
        </div>
        <div className="col-span-1">
          <Text type="body" size="M" className="text-violet-950">
            {`Added On : 20 Jan 2022`}
          </Text>
        </div>
        <div className="col-span-1">
          <Text type="body" size="M" className="text-violet-950">
            {`Total Amount : $ ${numberSeparator(dataCart?.total)}`}
          </Text>
        </div>
      </div>
      <Text type="subtitle" size="L" className="mb-2">
        LIST PRODUCTS CART
      </Text>
      <Table columns={columns} datas={orderedDataProduct} />
      <Link href="/carts">
        <Button className="w-1/12 mt-6" variant="outlined">
          Back
        </Button>
      </Link>
    </>
  );
};

export default DetailCart;
