"user client";

import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] w-full mx-auto xl:px-20 px-4 py-4 border-2xl border">
      {children}
    </div>
  );
};
