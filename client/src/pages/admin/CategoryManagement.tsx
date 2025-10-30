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
import type { JobCategory } from '@/api/admin.api'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import ImageUpload from '@/components/common/ImageUpload'

const CategoryManagement = () => {
  const [categories, setCategories] = useState<JobCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCategories, setTotalCategories] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10
  
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock data for frontend design - replace with actual API call when backend is ready
      const mockData = {
        success: true,
        data: {
          categories: [
            { id: '1', name: 'IT', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzM2NkZGIi8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '2', name: 'Finance', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMTBCOTgxIi8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '3', name: 'Healthcare', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY2QjIwIi8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '4', name: 'Marketing', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY0NDQ0Ii8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '5', name: 'Engineering', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOUI1Q0Y2Ii8+Cjwvc3ZnPgo=', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          ],
          total: 5,
          page: 1,
          limit: 10,
          totalPages: 1,
        }
      }

      // Uncomment when backend is ready:
      // const params = { page: currentPage, limit: itemsPerPage, search: searchTerm || undefined }
      // const response = await adminApi.getAllJobCategories(params)
      
      if (mockData.success && mockData.data) {
        // Filter by search term
        let filtered = mockData.data.categories
        if (searchTerm) {
          filtered = filtered.filter(cat => 
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        setCategories(filtered)
        setTotalPages(mockData.data.totalPages)
        setTotalCategories(filtered.length)
      } else {
        setError('Failed to fetch categories')
      }
    } catch {
      setError('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchTerm])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleCreate = () => {
    setCategoryName('')
    setCategoryImage('')
    setSelectedCategory(null)
    setCreateDialogOpen(true)
  }

  const handleEdit = (category: JobCategory) => {
    setSelectedCategory(category)
    setCategoryName(category.name)
    setCategoryImage((category as any).icon || '')
    setEditDialogOpen(true)
  }

  const handleDelete = (category: JobCategory) => {
    setSelectedCategory(category)
    setDeleteDialogOpen(true)
  }

  const handleCreateConfirm = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      // Mock implementation - replace with actual API call when backend is ready
      // const response = await adminApi.createJobCategory({ name: categoryName.trim(), icon: categoryImage || undefined })
      
      toast.success('Category created successfully')
      setCreateDialogOpen(false)
      setCategoryName('')
      setCategoryImage('')
      fetchCategories()
    } catch {
      toast.error('Failed to create category')
    }
  }

  const handleEditConfirm = async () => {
    if (!selectedCategory || !categoryName.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      // Mock implementation - replace with actual API call when backend is ready
      // const response = await adminApi.updateJobCategory(selectedCategory.id, { name: categoryName.trim(), icon: categoryImage || undefined })
      
      toast.success('Category updated successfully')
      setEditDialogOpen(false)
      setCategoryName('')
      setCategoryImage('')
      setSelectedCategory(null)
      fetchCategories()
    } catch {
      toast.error('Failed to update category')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return

    try {
      // Mock implementation - replace with actual API call when backend is ready
      // const response = await adminApi.deleteJobCategory(selectedCategory.id)
      
      toast.success('Category deleted successfully')
      setDeleteDialogOpen(false)
      setSelectedCategory(null)
      fetchCategories()
    } catch {
      toast.error('Failed to delete category')
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
          <h1 className="text-2xl font-bold text-foreground">Job Categories</h1>
          <Button className="flex items-center space-x-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
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
                  <p className="mt-2 text-sm text-gray-500">Loading categories...</p>
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
                <Button onClick={fetchCategories} variant="outline">
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
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">
                          No categories found
                        </td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            {(category as any).icon ? (
                              <img 
                                src={(category as any).icon} 
                                alt={category.name}
                                className="h-8 w-8 rounded object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-gray-800">{category.name}</p>
                          </td>
                          <td className="p-4 text-sm text-gray-700">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => handleEdit(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(category)}
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
              Showing {startIndex + 1} to {Math.min(endIndex, totalCategories)} of {totalCategories} categories
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
          title="Create Category"
          description="Add a new job category to the system. You can optionally upload an image."
          confirmText="Create"
        >
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., IT, Finance, Healthcare"
              className="mt-1"
            />
          </div>
          <ImageUpload
            value={categoryImage}
            onChange={setCategoryImage}
            placeholder="Upload category image"
          />
        </FormDialog>

        {/* Edit Dialog */}
        <FormDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onConfirm={handleEditConfirm}
          title="Edit Category"
          description="Update the category name and image."
          confirmText="Update"
        >
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., IT, Finance, Healthcare"
              className="mt-1"
            />
          </div>
          <ImageUpload
            value={categoryImage}
            onChange={setCategoryImage}
            placeholder="Upload category image"
          />
        </FormDialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Category"
          description={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </AdminLayout>
  )
}

export default CategoryManagement
