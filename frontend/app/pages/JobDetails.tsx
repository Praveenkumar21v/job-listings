"use client";

import { Job } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  X,
  Briefcase,
  Clock,
  Globe2,
  Globe,
  CalendarDays,
  MapPin,
  Contact,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { formatTimeAgoDetails } from "@/lib/utils";

interface JobDetailsProps {
  job: Job | null;
  onClose: () => void;
}

export default function JobDetails({ job, onClose }: JobDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full md:h-[calc(100vh-2rem)] md:sticky md:top-4" 
    >
      <Card className="h-full overflow-y-auto border-l-4 border-purple-600">
        <CardContent className="p-4 md:p-6 relative">
          {job ? (
            <>
              <Button
                variant="ghost"
                className="mb-4 flex items-center gap-2 md:hidden" 
                onClick={onClose}
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Jobs
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hidden md:block"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex items-start gap-4 mb-4">
                {job.companyImageUrl && (
                  <Image
                    src={job.companyImageUrl}
                    alt={`${job.company} logo`}
                    width={70}
                    height={70}
                    className="rounded object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-md text-gray-600">{job.company}</p>
                  <div className="mt-2">
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm mb-2 justify-end">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-zinc-500">
                  {formatTimeAgoDetails(job.postedDateTime)}
                </span>
              </div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Job Details
                </h2>
                <hr className="border-t border-gray-300 mt-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Contact className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{job.employment_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{job.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{job.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">
                    {new Date(job.postedDateTime).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {job.job_link && (
                <a
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 animate-pulse hover:animate-none cursor-pointer mt-5">
                    Quick Apply
                  </Button>
                </a>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a job to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
