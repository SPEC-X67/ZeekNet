import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { JobPostingStepProps } from "../../types/job-posting";

const JobInformationStep: React.FC<JobPostingStepProps> = ({
  data,
  onDataChange,
  onNext,
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const employmentTypes = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "remote", label: "Remote" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ];

  const categoryOptions = [
    { value: "tech", label: "Technology" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "design", label: "Design" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "operations", label: "Operations" },
    { value: "customer-service", label: "Customer Service" },
    { value: "engineering", label: "Engineering" }
  ];

  const handleEmploymentTypeToggle = (type: string) => {
    const updatedTypes = data.employmentTypes.includes(type)
      ? data.employmentTypes.filter(t => t !== type)
      : [...data.employmentTypes, type];
    
    onDataChange({ employmentTypes: updatedTypes });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.skillsRequired.includes(newSkill.trim())) {
      onDataChange({
        skillsRequired: [...data.skillsRequired, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onDataChange({
      skillsRequired: data.skillsRequired.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSalaryChange = (field: 'min' | 'max', value: number) => {
    onDataChange({ 
      salary: { 
        ...data.salary, 
        [field]: value 
      } 
    });
  };

  const handleAddCategory = () => {
    if (selectedCategory && !data.categoryIds.includes(selectedCategory)) {
      onDataChange({
        categoryIds: [...data.categoryIds, selectedCategory]
      });
      setSelectedCategory("");
      if (errors.categoryIds) {
        setErrors(prev => ({ ...prev, categoryIds: "" }));
      }
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    onDataChange({
      categoryIds: data.categoryIds.filter(category => category !== categoryToRemove)
    });
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.title.trim()) {
      newErrors.title = "Job title is required";
    } else if (data.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (data.title.trim().length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }
    
    if (!data.location.trim()) {
      newErrors.location = "Location is required";
    } else if (data.location.trim().length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    } else if (data.location.trim().length > 100) {
      newErrors.location = "Location must not exceed 100 characters";
    }
    
    if (data.employmentTypes.length === 0) {
      newErrors.employmentTypes = "Please select at least one employment type";
    } else {
      const validTypes = ["full-time", "part-time", "contract", "internship", "remote"];
      const invalidTypes = data.employmentTypes.filter(type => !validTypes.includes(type));
      if (invalidTypes.length > 0) {
        newErrors.employmentTypes = `Invalid employment types: ${invalidTypes.join(", ")}`;
      }
    }
    
    if (data.categoryIds.length === 0) {
      newErrors.categoryIds = "Please select at least one category";
    }
    
    if (data.salary.min < 0) {
      newErrors.salary = "Minimum salary cannot be negative";
    } else if (data.salary.max < 0) {
      newErrors.salary = "Maximum salary cannot be negative";
    } else if (data.salary.min > data.salary.max) {
      newErrors.salary = "Minimum salary cannot be greater than maximum salary";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  const handleFieldChange = useCallback((field: keyof typeof data, value: unknown) => {
    onDataChange({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [onDataChange, errors]);

  return (
    <div className="flex flex-col items-end gap-5 px-4 py-6">
      {/* Basic Information Header */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-base font-semibold text-[#25324B]">Basic Information</h2>
        <p className="text-sm text-[#7C8493]">This information will be displayed publicly</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Job Title */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">
            Job Title <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-[#7C8493]">Job titles must be describe one position</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            placeholder="e.g. Software Engineer"
            value={data.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className={`w-[387px] h-11 px-4 py-3 border rounded-[10px] ${errors.title ? 'border-red-500' : 'border-[#D6DDEB]'}`}
          />
          <p className="text-xs text-[#7C8493]">At least 5 characters</p>
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Location */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">
            Location <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-[#7C8493]">Where is this job located?</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            placeholder="e.g. New York, NY or Remote"
            value={data.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            className={`w-[387px] h-11 px-4 py-3 border rounded-[10px] ${errors.location ? 'border-red-500' : 'border-[#D6DDEB]'}`}
          />
          <p className="text-xs text-[#7C8493]">Specify city, state or country</p>
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Type of Employment */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">
            Type of Employment <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-[#7C8493]">You can select multiple type of employment</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {employmentTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.employmentTypes.includes(type.value)}
                  onChange={() => handleEmploymentTypeToggle(type.value)}
                  className="w-5 h-5 text-[#4640DE] border-2 border-[#D6DDEB] rounded focus:ring-[#4640DE]"
                />
                <span className="text-sm text-[#515B6F]">{type.label}</span>
              </label>
            ))}
          </div>
          {errors.employmentTypes && (
            <p className="text-xs text-red-500 mt-1">{errors.employmentTypes}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Salary */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">Salary</h3>
          <p className="text-sm text-[#7C8493]">Please specify the estimated salary range for the role. *You can leave this blank</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-18">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCF5] rounded-[10px]">
              <IndianRupee className="h-5 w-5 text-[#202430] opacity-50" />
              <div className="w-px h-5 bg-[#A8ADB7]"></div>
              <Input
                type="number"
                value={data.salary.min}
                onChange={(e) => handleSalaryChange('min', parseInt(e.target.value) || 0)}
                className="w-[60px] border-none p-0 text-sm font-semibold text-[#25324B]"
              />
            </div>
            <span className="text-sm text-[#7C8493]">to</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCF5] rounded-[10px]">
              <IndianRupee className="h-5 w-5 text-[#202430] opacity-50" />
              <div className="w-px h-5 bg-[#A8ADB7]"></div>
              <Input
                type="number"
                value={data.salary.max}
                onChange={(e) => handleSalaryChange('max', parseInt(e.target.value) || 0)}
                className="w-[66px] border-none p-0 text-sm font-semibold text-[#25324B]"
              />
            </div>
          </div>
          {errors.salary && (
            <p className="text-xs text-red-500 mt-1">{errors.salary}</p>
          )}
          </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Categories */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">
            Categories <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-[#7C8493]">Add job categories one by one</p>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-[#515B6F]">Add Job Categories</Label>
          
          {/* Add Category Section */}
          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] h-11 px-4 py-3 border border-[#D6DDEB] rounded-[10px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions
                  .filter(category => !data.categoryIds.includes(category.value))
                  .map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddCategory}
              disabled={!selectedCategory}
              className="h-11 px-4 py-2 bg-[#4640DE] text-white rounded-[10px] hover:bg-[#3A35C7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Selected Categories Display */}
          {data.categoryIds.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.categoryIds.map((categoryId) => {
                const category = categoryOptions.find(cat => cat.value === categoryId);
                return (
                  <div
                    key={categoryId}
                    className="flex items-center gap-2 bg-[#F8F9FF] border border-[#D6DDEB] rounded-[10px] px-3 py-2"
                  >
                    <span className="text-sm text-[#25324B]">{category?.label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(categoryId)}
                      className="text-[#7C8493] hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {errors.categoryIds && (
            <p className="text-xs text-red-500 mt-1">{errors.categoryIds}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Required Skills */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">Required Skills</h3>
          <p className="text-sm text-[#7C8493]">Add required skills for the job</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="w-[200px] h-9 px-3 py-2 border border-[#D6DDEB] rounded-[10px] text-sm"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              variant="companyOutline"
              className="w-[113px] h-9 border border-[#CCCCF5] rounded-[10px] text-[#4640DE] hover:bg-[#CCCCF5]"
            >
              <Plus className="h-3 w-3 mr-2" />
              Add Skills
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {data.skillsRequired.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1 bg-[#F8F8FD] rounded-lg"
              >
                <span className="text-sm text-[#4640DE]">{skill}</span>
                <Button
                  onClick={() => handleRemoveSkill(skill)}
                  variant="ghost"
                  className="hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-4 w-4 text-[#4640DE]" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Next Step Button */}
      <Button 
        onClick={handleNext} 
        variant="company"
        className="w-[150px] h-10 bg-[#4640de] hover:bg-[#4640DE]/90 text-white text-sm font-bold rounded-lg"
      >
        Next Step
      </Button>
    </div>
  );
};

export default JobInformationStep;