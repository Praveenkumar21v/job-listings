"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(location.trim());
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 bg-white p-2 rounded-lg shadow-sm sticky top-0 z-10"
    >
      <Input
        type="text"
        placeholder="Search by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 border-gray-300 focus:ring-purple-600 transition-all duration-300"
      />
      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
      >
        <Search className="h-4 w-4" />
      </Button>
    </motion.form>
  );
}
