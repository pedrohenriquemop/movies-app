import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import { PathSegment } from "./types";

interface Props {
  pathSegments: PathSegment[];
}

const AppBreadcrumb = ({ pathSegments }: Props) => {
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 1;

          if (isLastSegment)
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
              </BreadcrumbItem>
            );

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Link href={segment.href}>{segment.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
