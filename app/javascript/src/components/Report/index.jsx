import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { Link } from "react-router-dom";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";

const Report = () => {
  const [report, setReport] = useState();

  const fetchReport = async () => {
    try {
      const response = await quizzesApi.generateReport();
      const { quiz } = await response.data;
      setReport(quiz);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="">
      {report?.length ? (
        <div>
          <div className="w-full flex justify-end pr-8 pt-8">
            <Link to="#">
              <Button
                label="Download"
                size="large"
                icon={Download}
                iconPosition="left"
              />
            </Link>
          </div>
          <ReportTable report={report} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <Typography style="h2"> There is no Report to show. </Typography>
        </div>
      )}
    </div>
  );
};

export default Report;
