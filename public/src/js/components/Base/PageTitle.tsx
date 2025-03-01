import React from "react";
import { Typography } from "@material-tailwind/react";

type Props = {
  children?: any;
};

export default function PageTitle({ children }: Props) {
  return (
    <Typography className="text-xl text-center font-bold">{children}</Typography>
  );
}
