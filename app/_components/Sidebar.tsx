"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useCallback, ReactNode } from "react";
//COMPONENTS
import Text from "@/components/Text";
//THIRD PARTY
import clsx from "classnames";
import { RxDashboard } from "react-icons/rx";
import { CiMenuFries } from "react-icons/ci";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";

//TYPES
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuProps {
  label: string;
  icon: ReactNode;
  path: string;
}

//LIST MENU
const menus = [
  { label: "Dashboard", icon: <AiOutlineDashboard size={30} />, path: "" },
  { label: "Products", icon: <RxDashboard size={30} />, path: "products" },
  {
    label: "Carts",
    icon: <PiShoppingCartSimpleBold size={30} />,
    path: "carts",
  },
];

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathName = usePathname();
  //FUNCTIONS
  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return (
    <aside
      className={clsx(
        isOpen
          ? "translate-x-0 w-full sm:w-4/12 lg:w-1/6"
          : "hidden sm:block sm:w-50",
        "h-screen bg-slate-50 flex flex-col pt-5 relative ease-linear duration-300 -translate-x-full sm:translate-x-0"
      )}
    >
      <div
        onClick={toggleOpen}
        className={clsx(
          isOpen
            ? "bottom-20 sm:top-5 flex sm:translate-x-8"
            : "hidden sm:flex sm:translate-x-10",
          "absolute bg-slate-50 rounded-full items-center right-0 w-12 h-12 justify-center cursor-pointer sm:w-14 sm:h-14"
        )}
      >
        <CiMenuFries size={30} />
      </div>
      <section className="p-5 w-fit self-center z-10">
        <Link href="/">
          <img
            src="https://cdn.sejutacita.id/6242fd122ac6d40014108347/Others/055db2e8-6aaa-4584-b66d-83457b13f9df.png"
            alt="HTML tutorial"
            className={clsx(isOpen ? "w-16 h-w-16" : "w-8 h-w-8", "rounded-xl")}
          />
        </Link>
      </section>
      {menus.map((e: MenuProps) => {
        const isActive = pathName?.split("/")[1] === e?.path;
        return (
          <Link href={`/${e?.path}`} key={e?.label}>
            <nav
              className={clsx(
                isActive && "bg-gray-200 border-l-[#761CEC]",
                "hover:bg-gray-100 border-l-4 border-slate-50 hover:border-l-[#761CEC] p-5 flex items-center gap-6 cursor-pointer mt-5"
              )}
            >
              {e?.icon}
              <Text type="subtitle" className={isOpen ? "block" : "hidden"}>
                {e?.label}
              </Text>
            </nav>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
