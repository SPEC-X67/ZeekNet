import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { JobPostingStepProps } from "../../types/job-posting";
import { 
  Plus, 
  X, 
  Stethoscope, 
  Heart, 
  Calendar, 
  GraduationCap,
  Sparkles
} from "lucide-react";

const PerksBenefitsStep: React.FC<JobPostingStepProps> = ({
  data,
  onDataChange,
  onPrevious,
  onSubmit,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    title: "",
    description: "",
  });

  const defaultBenefits = [
    {
      id: "1",
      title: "Full Healthcare",
      description: "We believe in thriving communities and that starts with our team being happy and healthy.",
      icon: Stethoscope,
    },
    {
      id: "2", 
      title: "Unlimited Vacation",
      description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
      icon: Calendar,
    },
    {
      id: "3",
      title: "Skill Development", 
      description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
      icon: GraduationCap,
    },
  ];

  const handleAddBenefit = () => {
    if (newBenefit.title.trim() && newBenefit.description.trim()) {
      const benefit = {
        id: Date.now().toString(),
        title: newBenefit.title.trim(),
        description: newBenefit.description.trim(),
        icon: "stethoscope",
      };
      
      onDataChange({
        benefits: [...data.benefits, benefit]
      });
      
      setNewBenefit({ title: "", description: "" });
      setShowAddForm(false);
    }
  };

  const handleRemoveBenefit = (benefitId: string) => {
    onDataChange({
      benefits: data.benefits.filter(benefit => benefit.id !== benefitId)
    });
  };

  const handleCancelAdd = () => {
    setNewBenefit({ title: "", description: "" });
    setShowAddForm(false);
  };

  const displayBenefits = data.benefits.length > 0 ? data.benefits : defaultBenefits;

  return (
    <div className="flex flex-col items-end gap-5 px-4 py-6">
      {/* Perks & Benefits Header */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-base font-semibold text-[#25324B]">Perks & Benefits</h2>
        <p className="text-sm text-[#7C8493]">Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees.</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Add Benefit Section */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">Add Benefits</h3>
          <p className="text-sm text-[#7C8493]">Add benefits to encourage more people to apply</p>
        </div>
        <div className="flex flex-col gap-3">
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              variant="companyOutline"
              className="w-[300px] h-10 border border-[#CCCCF5] rounded-[10px] text-sm font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Benefits
            </Button>
          ) : (
            <div className="flex flex-col gap-3 w-[387px]">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-semibold text-[#515B6F]">Benefit Title</Label>
                <Input
                  placeholder="e.g. Health Insurance"
                  value={newBenefit.title}
                  onChange={(e) => setNewBenefit(prev => ({ ...prev, title: e.target.value }))}
                  className="h-10 px-4 py-3 border border-[#D6DDEB] rounded-[10px] text-sm text-[#25324B] placeholder:text-[#7C8493]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-semibold text-[#515B6F]">Description</Label>
                <Textarea
                  placeholder="Describe this benefit..."
                  value={newBenefit.description}
                  onChange={(e) => setNewBenefit(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[108px] px-4 py-3 border border-[#D6DDEB] rounded-[10px] text-sm text-[#25324B] placeholder:text-[#7C8493] resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddBenefit}
                  variant="company"
                  className="flex-1 h-10 bg-[#4640DE] hover:bg-[#4640DE]/90 text-white text-sm font-semibold rounded-[10px]"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Add Benefits
                </Button>
                <Button
                  variant="companyOutline"
                  onClick={handleCancelAdd}
                  className="flex-1 h-10 border border-[#CCCCF5] rounded-[10px] text-[#4640DE] hover:bg-[#CCCCF5] text-sm font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Benefits List */}
      <div className="flex gap-30 w-full">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#25324B]">Benefits</h3>
          <p className="text-sm text-[#7C8493]">Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#4640DE]" />
            <span className="text-base font-semibold text-[#25324B]">Current Benefits</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {displayBenefits.map((benefit) => {
              const IconComponent = benefit.icon === "stethoscope" ? Stethoscope : 
                                   benefit.icon === "calendar" ? Calendar :
                                   benefit.icon === "graduation" ? GraduationCap : Stethoscope;
              
              return (
                <div key={benefit.id} className="flex items-start gap-3 p-3 border border-[#D6DDEB] rounded-[10px] hover:shadow-md transition-shadow">
                  <div className="p-2 bg-[#4640DE] bg-opacity-10 rounded-lg">
                    <IconComponent className="h-5 w-5 text-[#4640DE]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-[#25324B] mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-[#7C8493]">
                      {benefit.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBenefit(benefit.id)}
                    className="p-1 hover:bg-[#CCCCF5] rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-[#7C8493]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full">
        <Button
          onClick={onPrevious}
          className="w-[150px] h-10 text-base font-bold"
          variant="companyOutline"
       >
          Previous
        </Button>
        <Button
          onClick={onSubmit}
          className="w-[150px] h-10 text-white text-base font-bold rounded-lg"
          variant="company"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PerksBenefitsStep;