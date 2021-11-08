import React, { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import "./table.css";

const QuizListTable = ({ quizList }) => {
  const column = [{ header: "Quiz Name", accessor: "name" }];

  const columns = useMemo(() => column, []);

  const data = useMemo(() => quizList, [quizList]);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="w-9/12 ml-auto mr-auto">
      <h2>List of Quizzes</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <>
                      <td
                        key={index}
                        className="flex justify-between"
                        {...cell.getCellProps()}
                      >
                        <div>{cell.render("Cell")}</div>
                        <div className="w-2/12 flex justify-between">
                          <Button
                            label="Edit"
                            onClick={function noRefCheck() {}}
                            style="secondary"
                            icon={Edit}
                            iconPosition="left"
                            size="large"
                          />
                          <Button
                            label="Delete"
                            onClick={function noRefCheck() {}}
                            style="danger"
                            icon={Delete}
                            iconPosition="left"
                            size="large"
                          />
                        </div>
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

export default QuizListTable;
