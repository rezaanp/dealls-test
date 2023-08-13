import { FC, useCallback } from "react";
import { usePathname } from "next/navigation";
//COMPONENTS
import Text from "@/components/Text";
//THIRD PARTY
import clsx from "classnames";
import { CiMenuFries } from "react-icons/ci";

//TYPES
interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuProps {
  label: string;
  path: string;
}

//LIST MENU
const menus = [
  { label: "Dashboard", path: "" },
  { label: "Products", path: "products" },
  { label: "Carts", path: "carts" },
];

const Header: FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const pathName = usePathname();
  //FUNCITONS
  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return (
    <header
      className={clsx(
        "p-5 flex justify-between sm:justify-end items-center underline"
      )}
    >
      <div
        onClick={toggleOpen}
        className={clsx(
          !isOpen && "block",
          "sm:hidden",
          "w-12 h-12 justify-center cursor-pointer bg-slate-50 flex items-center rounded-full"
        )}
      >
        <CiMenuFries size={30} />
      </div>
      <div>
        <Text type="title" size="XL">
          {`${
            menus?.find((e: MenuProps) => e?.path === pathName.split("/")[1])
              ?.label
          } ${pathName.split("/")[2] ?? ""}`}
        </Text>
      </div>
    </header>
  );
};

export default Header;
