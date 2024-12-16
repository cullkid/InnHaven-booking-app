"user client";

import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:px-[5rem] sm:px-[2rem] px-[0.50rem] py-4 border-2xl border">
      {children}
    </div>
  );
};
