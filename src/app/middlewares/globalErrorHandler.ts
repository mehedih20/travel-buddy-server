/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";

type TSingleIssue = {
  field: string;
  message: string;
};

type TIssues = {
  issues: TSingleIssue[];
};

const zodErrorMessageGenerator = (err: ZodError) => {
  let errorMessage = "";
  const errorDetails: TIssues = {
    issues: [],
  };

  err?.issues.map((item: ZodIssue) => {
    const singleMsg: string = `${
      item.path[item.path.length - 1]
    } is ${item.message.toLowerCase()}. `;

    const issueObj: TSingleIssue = {
      field: item.path[item.path.length - 1] as string,
      message: singleMsg as string,
    };

    errorMessage += singleMsg;
    errorDetails.issues.push(issueObj);
  });

  return {
    errorMessage,
    errorDetails,
  };
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 500;
  let errorMessage = "Something went wrong";
  let errorDetails = err;

  if (err instanceof ZodError) {
    const errorObj = zodErrorMessageGenerator(err);
    errorMessage = errorObj.errorMessage;
    errorDetails = errorObj.errorDetails;
  }

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    errorDetails,
  });
};

export default globalErrorHandler;
