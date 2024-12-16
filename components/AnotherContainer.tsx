"user client";

import React from "react";

export const AnotherContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="lg:px-[5rem] sm:px-[2rem] px-[0.50rem]">{children}</div>
  );
};
