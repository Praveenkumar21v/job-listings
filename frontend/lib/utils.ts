import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Job {
  _id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  job_link: string;
  employment_type: string;
  experience: string;
  source: string;
  country: string;
  postedDateTime: string;
  companyImageUrl: string;
  min_exp: number;
  max_exp: number;
  daysAgo?: number;
}

export function formatTimeAgo(postedDateTime: string): string {
  const currentDate = new Date();
  const postedDate = new Date(postedDateTime);
  const daysAgo = Math.floor(
    (currentDate.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysAgo < 30) {
    return `${daysAgo}d`;
  } else if (daysAgo < 365) {
    const months = Math.floor(daysAgo / 30);
    return `${months}m`;
  } else {
    const years = Math.floor(daysAgo / 365);
    return `${years}y`;
  }
}

export function formatTimeAgoDetails(postedDateTime: string): string {
  const currentDate = new Date();
  const postedDate = new Date(postedDateTime);
  const daysAgo = Math.floor(
    (currentDate.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysAgo < 30) {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (daysAgo < 365) {
    const months = Math.floor(daysAgo / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(daysAgo / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}