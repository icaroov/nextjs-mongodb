import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/src/utils/dbConnect";
import User from "@/src/models/User";
import { ResponseData } from "./index";

dbConnect();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) {
          res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const update = req.body;
        const options = {
          new: true,
          runValidators: true,
        };

        //@ts-ignore
        const user = await User.findByIdAndUpdate(id, update, options);

        if (!user) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });

        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
  }
};
