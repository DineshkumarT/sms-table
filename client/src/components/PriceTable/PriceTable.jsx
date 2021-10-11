import React, { useEffect } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import dayjs from "dayjs";
import { ButtonWrapper, Styles } from "./PriceTable.styles";
import { Button } from "../../App.styles";

const filterMethod = (rows, _id, filters) => {
  let startDate, endDate;
  if (filters.length === 0) {
    return rows;
  }
  const [fromDate, toDate] = filters;
  const filteredRows = rows.filter((row) => {
    startDate = row.original["startdate"];
    endDate = row.original["enddate"];
    return (
      dayjs(startDate).isAfter(fromDate) &&
      dayjs(startDate).isBefore(toDate) &&
      dayjs(endDate).isAfter(fromDate) &&
      dayjs(endDate).isBefore(toDate)
    );
  });
  return filteredRows;
};

function Table({ columns, data, filters }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      globalFilter: filterMethod,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setGlobalFilter(filters);
  }, [filters]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ButtonWrapper>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </ButtonWrapper>
    </>
  );
}

const PriceTable = ({ data, filters }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Information Grid",
        columns: [
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Start Date",
            accessor: "startdate",
            Cell: ({ value }) => <div>{dayjs(value).format("MM-DD-YYYY")}</div>,
          },
          {
            Header: "End Date",
            accessor: "enddate",
            Cell: ({ value }) => <div>{dayjs(value).format("MM-DD-YYYY")}</div>,
          },
          {
            Header: "Price",
            accessor: "price",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Color",
            accessor: "color",
          },
        ],
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={data} filters={filters} />
    </Styles>
  );
};

export default React.memo(PriceTable);
