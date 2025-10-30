import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FormDialog from '@/components/common/FormDialog'
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from 'lucide-react'
import type { Skill } from '@/api/admin.api'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import ImageUpload from '@/components/common/ImageUpload'

const SkillManagement = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [skillName, setSkillName] = useState('')
  const [skillImage, setSkillImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalSkills, setTotalSkills] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10
  
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock response for now - replace with actual API call later
      // const params = { page: currentPage, limit: itemsPerPage, search: searchTerm || undefined }
       const mockData = {
         success: true,
         data: {
           skills: [
             { id: '1', name: 'Python', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY2QjIwIi8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
             { id: '2', name: 'ReactJS', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNjFkYWY0Ii8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
             { id: '3', name: 'Data Analysis', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY0NDQ0Ii8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
           ],
           total: 3,
           page: 1,
           limit: 10,
           totalPages: 1,
         }
       }

      // Uncomment when backend is ready:
      // const response = await adminApi.getAllSkills(params)
      
      if (mockData.success && mockData.data) {
        setSkills(mockData.data.skills)
        setTotalPages(mockData.data.totalPages)
        setTotalSkills(mockData.data.total)
      } else {
        setError('Failed to fetch skills')
      }
    } catch {
      setError('Failed to fetch skills')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchTerm])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const handleCreate = () => {
    setSkillName('')
    setSkillImage('')
    setSelectedSkill(null)
    setCreateDialogOpen(true)
  }

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill)
    setSkillName(skill.name)
    setSkillImage(skill.icon || '')
    setEditDialogOpen(true)
  }

  const handleDelete = (skill: Skill) => {
    setSelectedSkill(skill)
    setDeleteDialogOpen(true)
  }

  const handleCreateConfirm = async () => {
    if (!skillName.trim()) {
      toast.error('Skill name is required')
      return
    }

    try {
      // Mock implementation - replace with actual API call later
      // const response = await adminApi.createSkill({ name: skillName.trim(), icon: skillImage || undefined })
      
      toast.success('Skill created successfully')
      setCreateDialogOpen(false)
      setSkillName('')
      setSkillImage('')
      fetchSkills()
    } catch {
      toast.error('Failed to create skill')
    }
  }

  const handleEditConfirm = async () => {
    if (!selectedSkill || !skillName.trim()) {
      toast.error('Skill name is required')
      return
    }

    try {
      // Mock implementation - replace with actual API call later
      // const response = await adminApi.updateSkill(selectedSkill.id, { name: skillName.trim(), icon: skillImage || undefined })
      
      toast.success('Skill updated successfully')
      setEditDialogOpen(false)
      setSkillName('')
      setSkillImage('')
      setSelectedSkill(null)
      fetchSkills()
    } catch {
      toast.error('Failed to update skill')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSkill) return

    try {
      // Mock implementation - replace with actual API call later
      // const response = await adminApi.deleteSkill(selectedSkill.id)
      
      toast.success('Skill deleted successfully')
      setDeleteDialogOpen(false)
      setSelectedSkill(null)
      fetchSkills()
    } catch {
      toast.error('Failed to delete skill')
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Skills Management</h1>
          <Button className="flex items-center space-x-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            <span>Add Skill</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading skills...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchSkills} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">Icon</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Created</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">
                          No skills found
                        </td>
                      </tr>
                    ) : (
                      skills.map((skill) => (
                         <tr key={skill.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                           <td className="p-4">
                             {skill.icon ? (
                               <img 
                                 src={skill.icon} 
                                 alt={skill.name}
                                 className="h-8 w-8 rounded object-cover"
                               />
                             ) : (
                               <ImageIcon className="h-6 w-6 text-gray-400" />
                             )}
                           </td>
                          <td className="p-4">
                            <p className="font-medium text-gray-800">{skill.name}</p>
                          </td>
                          <td className="p-4 text-sm text-gray-700">
                            {new Date(skill.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => handleEdit(skill)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(skill)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, totalSkills)} of {totalSkills} skills
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === page 
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Create Dialog */}
        <FormDialog
          isOpen={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onConfirm={handleCreateConfirm}
          title="Create Skill"
          description="Add a new skill to the system. You can optionally upload an image."
          confirmText="Create"
        >
          <div>
            <label className="text-sm font-medium">Skill Name</label>
            <Input
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., Python, ReactJS, Data Analysis"
              className="mt-1"
            />
          </div>
          <ImageUpload
            value={skillImage}
            onChange={setSkillImage}
            placeholder="Upload skill image"
          />
        </FormDialog>

        {/* Edit Dialog */}
        <FormDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onConfirm={handleEditConfirm}
          title="Edit Skill"
          description="Update the skill name and image."
          confirmText="Update"
        >
          <div>
            <label className="text-sm font-medium">Skill Name</label>
            <Input
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., Python, ReactJS, Data Analysis"
              className="mt-1"
            />
          </div>
          <ImageUpload
            value={skillImage}
            onChange={setSkillImage}
            placeholder="Upload skill image"
          />
        </FormDialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Skill"
          description={`Are you sure you want to delete "${selectedSkill?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </AdminLayout>
  )
}

export default SkillManagement
