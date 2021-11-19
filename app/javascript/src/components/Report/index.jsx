import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button, Typography, PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { Link } from "react-router-dom";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";
import usersApi from "../../apis/users";

const Report = () => {
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(false);
  const [download, setDownload] = useState(false);
  const [jobId, setJobId] = useState("");

  const handleDownload = async () => {
    try {
      const response = usersApi.exportReport();
      const job_id = (await response).data.jid;
      const jobIntervel = setInterval(async () => {
        const status = await usersApi.exportStatus(job_id);
        if (status.data.percentage == 100) {
          clearInterval(jobIntervel);
          setJobId(job_id);
          setLoading(false);
          setDownload(true);
        }
      }, 1000);
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadReport = () => {
    window.location.replace(`/users/export/download/${jobId}`);
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

  if (loading) {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <PageLoader text="Your report is being prepared for downloading" />
      </div>
    );
  }

  if (download) {
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full space-y-4">
        <Typography style="h3">Report is now ready for download</Typography>
        <Button
          label="Download Report"
          size="large"
          icon={Download}
          iconPosition="left"
          onClick={() => downloadReport()}
        />
      </div>
    );
  }

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
                onClick={() => {
                  setLoading(true);
                  handleDownload();
                }}
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
