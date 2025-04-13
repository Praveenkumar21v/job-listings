"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import SearchBar from "./pages/SearchBar";
import JobCard from "./pages/JobCard";
import JobDetails from "./pages/JobDetails";
import LoadingSpinner from "./pages/LoadingSpinner";
import { Job } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [location, setLocation] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobElementRef = useRef<HTMLDivElement | null>(null);

  const fetchJobs = useCallback(
    async (
      newOffset: number,
      loc: string = "",
      isNewSearch: boolean = false
    ) => {
      try {
        setLoading(true);
        setError(null);
        const url = loc
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?location=${encodeURIComponent(
              loc
            )}&offset=${newOffset}&limit=${limit}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?offset=${newOffset}&limit=${limit}`;
        const response = await axios.get(url);
        const { jobs: newJobs, totalJobs: total } = response.data;

        const currentDate = new Date();
        const updatedJobs = newJobs.map((job: Job) => ({
          ...job,
          daysAgo: Math.floor(
            (currentDate.getTime() - new Date(job.postedDateTime).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        }));

        setJobs((prev) =>
          isNewSearch ? updatedJobs : [...prev, ...updatedJobs]
        );
        setTotalJobs(total);
        setHasMore(
          updatedJobs.length > 0 && updatedJobs.length + newOffset < total
        );
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchJobs(0, "", true);
  }, [fetchJobs]);

  const handleSearch = useCallback(
    (loc: string) => {
      const trimmedLoc = loc.trim();
      setLocation(trimmedLoc);
      setOffset(0);
      setJobs([]);
      setSelectedJob(null);
      if (trimmedLoc === "") {
        fetchJobs(0, "", true);
      } else {
        fetchJobs(0, trimmedLoc, true);
      }
    },
    [fetchJobs]
  );

  const loadMoreJobs = useCallback(() => {
    if (loading || !hasMore) return;
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchJobs(newOffset, location);
  }, [loading, hasMore, offset, limit, location, fetchJobs]);

  useEffect(() => {
    const lastElement = lastJobElementRef.current;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreJobs();
        }
      },
      { threshold: 0.1 }
    );

    if (lastElement) {
      observer.current.observe(lastElement);
    }

    return () => {
      if (lastElement && observer.current) {
        observer.current.unobserve(lastElement);
      }
    };
  }, [hasMore, loading, loadMoreJobs]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 md:p-6">
        {!selectedJob ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 gap-4 mt-4">
              {error && <p className="text-red-500 p-4">{error}</p>}
              {jobs.length === 0 && !loading && !error && (
                <p className="text-gray-500 p-4">No jobs found.</p>
              )}
              {jobs.map((job, index) => {
                const isLastElement = index === jobs.length - 1;
                return (
                  <div
                    key={job._id}
                    ref={isLastElement ? lastJobElementRef : null}
                  >
                    <JobCard
                      job={job}
                      isSelected={false}
                      onSelect={() => handleSelectJob(job)}
                    />
                  </div>
                );
              })}
              {loading && <LoadingSpinner />}
              {!hasMore && jobs.length > 0 && (
                <p className="text-gray-500 p-4 text-center">
                  No more jobs to load. Total jobs: {totalJobs}.
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-full ${
                selectedJob ? "hidden md:block md:w-1/3" : "block"
              }`}
            >
              <SearchBar onSearch={handleSearch} />
              <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
                {jobs.map((job, index) => (
                  <div key={index}>
                    <JobCard
                      job={job}
                      isSelected={selectedJob?._id === job._id}
                      onSelect={() => handleSelectJob(job)}
                    />
                  </div>
                ))}
                {loading && <LoadingSpinner />}
              </div>
            </motion.div>
            <motion.div
              className={`w-full ${
                selectedJob ? "fixed inset-0 z-50 md:static md:w-2/3" : "hidden"
              }`}
            >
              <JobDetails job={selectedJob} onClose={handleCloseDetails} />
            </motion.div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
