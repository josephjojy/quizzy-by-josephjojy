import React, { useMemo } from "react";

import { useTable } from "react-table";

const ReportTable = ({ report }) => {
  const column = [
    { header: "Quiz Name", accessor: "title" },
    { header: "User Name", accessor: "full_name" },
    { header: "Email", accessor: "email" },
    { header: "Correct Answers", accessor: "correct_count" },
    { header: "Incorrect Answers", accessor: "incorrect_count" },
  ];

  const columns = useMemo(() => column, []);

  const data = useMemo(() => report, [report]);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-10/12 ml-auto mr-auto">
      <h2>Reports</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, rowIndex) => (
            <tr key={rowIndex} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, colIndex) => (
                <th key={colIndex} {...column.getHeaderProps()}>
                  {column.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr key={rowIndex} {...row.getRowProps()}>
                {row.cells.map((cell, colIndex) => {
                  return (
                    <>
                      <td key={colIndex} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
