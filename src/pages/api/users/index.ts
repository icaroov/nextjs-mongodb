import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/src/utils/dbConnect";
import User from "@/src/models/User";

dbConnect();

export type ResponseData = {
  success: boolean;
  data?: any[] | {};
  message?: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const name: string = req.body.name;

        const nameAlreadyExists = await User.findOne({ name });

        if (nameAlreadyExists) {
          res.status(403).json({
            success: false,
            message: "The name already exists. Try another one.",
          });
          return;
        }

        const user = await User.create(req.body);

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
