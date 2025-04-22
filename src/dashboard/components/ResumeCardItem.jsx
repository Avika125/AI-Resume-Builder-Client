import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Edit2, Download, Trash2 } from 'lucide-react'
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const onEdit = () => {
    navigate(`/dashboard/resume/${resume.id}/edit`)
  }

  const onDownload = () => {
    // Open the resume view in a new tab for printing or saving
    window.open(`${window.location.origin}/my-resume/${resume.id}/view`, '_blank')
  }

  const onDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return
    setDeleting(true)
    try {
      await GlobalApi.DeleteResumeById(resume.id)
      toast.success('Resume deleted')
      refreshData && refreshData()
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/dashboard/resume/${resume.id}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4"
          style={{ borderColor: resume.themeColor || '#000' }}
        >
          <div className="flex items-center justify-center h-full">
            <img src="/cv.png" width={80} height={80} alt="Resume Preview" />
          </div>
        </div>
        <h2 className="text-center my-1 font-medium group-hover:scale-105 transition-transform">
          {resume.title}
        </h2>
      </Link>

      {/* Action Icons */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2
          className="h-5 w-5 text-gray-700 cursor-pointer"
          title="Edit"
          onClick={onEdit}
        />
        <Download
          className="h-5 w-5 text-gray-700 cursor-pointer"
          title="Download"
          onClick={onDownload}
        />
        <Trash2
          className={`h-5 w-5 cursor-pointer ${deleting ? 'text-red-400 animate-pulse' : 'text-gray-700'}`}
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  )
}

export default ResumeCardItem
