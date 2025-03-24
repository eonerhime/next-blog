"use client";

import "flowbite";
import { useEffect } from "react";
import { Flowbite } from "flowbite-react";

export default function FlowbiteProvider({ children }) {
  useEffect(() => {
    require("flowbite");
  }, []);

  return <Flowbite>{children}</Flowbite>;
}
