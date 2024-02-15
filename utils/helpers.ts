import { Response } from "express";

const httpResponse = (res: Response, message?: string, data?: any, status?: number) => {
    //  const statusCode = !status ? 200 : status;
    const payload = {
      success: true,
      message: message ? message : "",
      data,
    };
  
    res.status(!status ? 200 : status).json(payload);
  };
  
  const httpErrorResponse = (res: Response,message?: string,error?: any,status?: number) => {
    //  const statusCode = !status ? 200 : status;
    
    const payload = {
      success: false,
      message: message ? message : "Something went wrong",
      error,
    };
  
    res.status(!status ? 400 : status).json(payload);
  };

  const removeUndefinedObjValues = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
    return obj as any;
  };
  export {
    httpResponse,
    httpErrorResponse,
    removeUndefinedObjValues
  }