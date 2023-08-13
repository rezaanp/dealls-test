import { FC, useCallback } from "react";
//COMPONENTS
import Button from "@/components/Button";
import { InputText } from "@/components/Input";
//THIRD PARTY
import { FaSearch } from "react-icons/fa";

interface ColumnProps {
  title: string;
  key?: string;
  component?: any;
}

interface TableProps {
  columns: ColumnProps[];
  datas: any;
  skip?: number;
  setSkip?: React.Dispatch<React.SetStateAction<number>>;
  totalData?: number;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  placeholderSearch?: string;
}

const Table: FC<TableProps> = ({
  columns,
  datas,
  skip,
  setSkip,
  totalData,
  search,
  setSearch,
  placeholderSearch = "Search",
}) => {
  //FUNCTIONS
  const handleChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch && setSearch(event?.target?.value);
      setSkip && setSkip(0);
    },
    []
  );

  const handlePreviousPage = useCallback(() => {
    setSkip && setSkip((current) => current - 10);
  }, []);

  const handleNextPage = useCallback(() => {
    setSkip && setSkip((current) => current + 10);
  }, []);

  return (
    <>
      {/* INPUT SEARCH */}
      <div>
        {search !== undefined && (
          <div className="flex w-full lg:justify-end mb-3">
            <div className="w-3/5 lg:w-1/3">
              <InputText
                onChange={handleChangeSearch}
                placeholder={placeholderSearch}
                Icon={
                  <FaSearch
                    className="absolute right-5 top-3"
                    color="#94a3b8"
                  />
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative w-full overflow-auto rounded-lg flex flex-col">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-500 text-white">
              <th className="pl-3 py-2">No.</th>
              {columns?.map((e: ColumnProps) => (
                <th key={e?.title}>{e?.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datas?.length ? (
              datas?.map((data: any, index: number) => (
                <tr key={data?.id}>
                  <td className="py-2 pl-3 border-b-2 border-gray-200">
                    {index + 1}
                  </td>
                  {columns?.map((column: ColumnProps) => (
                    <td
                      key={column?.title}
                      className="py-2 border-b-2 border-gray-200"
                    >
                      {column?.component ? (
                        <column.component data={data} />
                      ) : (
                        data[column.key ?? ""]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center border-2 py-5"
                  colSpan={columns?.length + 1}
                >
                  Data Doesn't Exist
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {skip !== undefined && (
          <div className="flex gap-3 mt-3 lg:self-end">
            <Button
              variant="contained"
              disabled={Boolean(!skip)}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <div>{`${Number(totalData) ? skip / 10 + 1 : 0}-${
              Math.ceil(Number(totalData) / 10) || 0
            } of ${totalData || 0}`}</div>
            <Button
              variant="contained"
              disabled={skip / 10 + 1 >= Number(totalData) / 10}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
