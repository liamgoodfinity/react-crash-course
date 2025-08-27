import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import JobsPage from './pages/JobsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import JobPage from './pages/JobPage.jsx'
import jobLoader from './loaders/jobLoader.js'
import AddJob from './pages/AddJob.jsx'
import EditJobPage from './pages/EditJobPage.jsx'

const App = () => {
  // add new job
  const addJob = async (job) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    return;
  }

  // delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })
    return;
  }

  const updateJob = async (id, updatedJob) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/add-job' element={<AddJob addJobSubmit={addJob}/>} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJob={updateJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App