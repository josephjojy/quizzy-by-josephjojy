import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { Link } from "react-router-dom";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";
import usersApi from "../../apis/users";

const Report = () => {
  const [report, setReport] = useState();

  const handleDownload = async () => {
    try {
      const response = usersApi.exportReport();
      const job_id = (await response).data.jid;
      const jobIntervel = setInterval(async () => {
        const status = await usersApi.exportStatus(job_id);
        if (status.data.percentage == 100) {
          clearInterval(jobIntervel);
          const blob = await usersApi.exportDownload(job_id);
          const url = URL.createObjectURL(blob.data);
          window.location.replace(url);
        } else Logger.info(status.data);
      }, 1000);
    } catch (error) {
      Logger.error(error);
    }
  };

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
                onClick={() => handleDownload()}
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
