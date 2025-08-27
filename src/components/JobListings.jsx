import { useState, useEffect } from 'react'  
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);
        setJobs(data)
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    }
    fetchJobs();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Job Listings' : 'All Jobs'}
        </h2>
        <div >
          {loading ? (<Spinner />) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>)}
          
        </div>
      </div>
    </section>
  )
}

export default JobListings