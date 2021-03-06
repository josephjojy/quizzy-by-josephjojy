import React, { useMemo, useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useTable } from "react-table";

import "../../../stylesheets/table.css";
import quizzesApi from "../../apis/quizzes";
import DeleteModal from "../Common/DeleteModal";

const QuizListTable = ({ quizList, fetchQuiz }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteQuiz, setDeleteQuiz] = useState(0);

  const column = [{ header: "Quiz Name", accessor: "name" }];

  const columns = useMemo(() => column, []);

  const data = useMemo(() => quizList, [quizList]);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleDelete = async id => {
    try {
      await quizzesApi.destroy(id);
      fetchQuiz();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleEdit = id => {
    window.location.assign(`/quiz/${id}/edit`);
  };

  const handleShow = id => {
    window.location.assign(`/quiz/${id}/show`);
  };

  return (
    <div className="w-9/12 ml-auto mr-auto">
      <DeleteModal
        deleteQuiz={deleteQuiz}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
      />
      <h2>List of Quizzes</h2>
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
                      <td
                        key={colIndex}
                        className="flex justify-between"
                        {...cell.getCellProps()}
                      >
                        <div>
                          <Button
                            label={cell.render("Cell")}
                            onClick={() => {
                              handleShow(cell.row.original.id);
                            }}
                            style="text"
                          />
                        </div>
                        <div className="w-48 flex justify-between">
                          <Button
                            label="Edit"
                            onClick={() => {
                              handleEdit(cell.row.original.id);
                            }}
                            style="secondary"
                            icon={Edit}
                            iconPosition="left"
                            size="large"
                          />
                          <Button
                            label="Delete"
                            onClick={() => {
                              setDeleteQuiz(cell.row.original.id);
                              setDeleteModal(true);
                            }}
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
