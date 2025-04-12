const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); 

router.get('/', async (req, res) => {
  try {
    const { location, offset = 0, limit = 10 } = req.query;
    let query = {};
    
    if (location) {
      query = { location: { $regex: location, $options: 'i' } };
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));


    const formattedJobs = jobs.map(job => ({
      _id: job._id,
      jobId: job['Job ID (Numeric)'],
      title: job.title || 'Untitled',
      company: job.company || 'Unknown',
      location: job.location || 'Unknown',
      job_link: job.job_link || '',
      employment_type: job.employment_type || 'N/A',
      experience: job.experience || 'N/A',
      source: job.source || 'N/A',
      country: job.country || 'N/A',
      postedDateTime: job.postedDateTime || new Date(),
      companyImageUrl: job.companyImageUrl || '',
      min_exp: job.min_exp || 0,
      max_exp: job.max_exp || 0,
    }));

    res.json({
      jobs: formattedJobs,
      totalJobs,
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;