"use client";

import { Job } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils";
import { MdLocationPin } from "react-icons/md";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: () => void;
}

export default function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-2"
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4",
          isSelected ? "border-purple-600 bg-purple-50" : "border-gray-300"
        )}
        onClick={onSelect}
      >
        <CardContent className="p-4 relative">
          <h3 className="text-lg font-semibold text-blue-900 truncate">
            {job.title}
          </h3>
          <p className="text-md text-zinc-500 truncate">{job.company}</p>
          <p className="flex gap-1 text-sm text-gray-600 mt-2">
            <MdLocationPin size={18} className="text-gray-400" /> {job.location}
          </p>
          <span className="text-purple-600 font-medium mt-2 inline-block">
            Quick Apply
          </span>
          <p className="absolute right-5 text-sm font-semibold text-slate-500 truncate">
            {formatTimeAgo(job.postedDateTime)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
