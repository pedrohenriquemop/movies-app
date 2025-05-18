"use client";

import React, { createContext, useState } from "react";

export type BreadcrumbContextData = {
  [originalName: string]: string;
};

type BreadcrumbContextType = {
  breadcrumb: BreadcrumbContextData | null;
  setBreadcrumb: (label: BreadcrumbContextData | null) => void;
};

export const BreadcrumbContext = createContext<
  BreadcrumbContextType | undefined
>(undefined);

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbContextData | null>(
    null,
  );

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
