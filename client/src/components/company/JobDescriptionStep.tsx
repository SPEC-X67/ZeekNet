import type { JobPostingStepProps, JobPostingData } from "../../types/job-posting";
import { useJobDescriptionForm } from "../../hooks/useJobDescriptionForm";
import { JobDescriptionTextField } from "./JobDescriptionTextField";
import { ArrayInputField } from "./ArrayInputField";
import { NavigationButtons } from "./NavigationButtons";

const JobDescriptionStep: React.FC<JobPostingStepProps> = ({
  data,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const { errors, handleFieldChange, validateFields } = useJobDescriptionForm(data, onDataChange);

  // Wrapper function to handle array field changes
  const handleArrayFieldChange = (field: keyof JobPostingData, value: string[]) => {
    handleFieldChange(field, value as string | string[]);
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-end gap-5 px-4 py-6">
      {/* Job Description Header */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-base font-semibold text-[#25324B]">Job Description</h2>
        <p className="text-sm text-[#7C8493]">Add the description of the job, responsibilities, who you are, and nice-to-haves.</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Job Description */}
      <JobDescriptionTextField
        field="description"
        label="Job Description"
        placeholder="Enter job description..."
        helperText="Describe the role and what the candidate will be doing"
        value={data.description}
        required={true}
        error={errors.description}
        onChange={handleFieldChange}
      />

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Responsibilities */}
      <ArrayInputField
        field="responsibilities"
        label="Responsibilities"
        placeholder="Enter a responsibility..."
        helperText="Outline the core responsibilities of the position"
        value={Array.isArray(data.responsibilities) ? data.responsibilities : []}
        required={true}
        error={errors.responsibilities}
        onChange={handleArrayFieldChange}
      />

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Qualifications */}
      <ArrayInputField
        field="qualifications"
        label="Who You Are"
        placeholder="Enter a qualification..."
        helperText="Add your preferred candidate qualifications"
        value={Array.isArray(data.qualifications) ? data.qualifications : []}
        required={true}
        error={errors.qualifications}
        onChange={handleArrayFieldChange}
      />

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Nice-To-Haves */}
      <ArrayInputField
        field="niceToHaves"
        label="Nice-To-Haves"
        placeholder="Enter a nice-to-have..."
        helperText="Add nice-to-have skills and qualifications to encourage a more diverse set of candidates to apply"
        value={Array.isArray(data.niceToHaves) ? data.niceToHaves : []}
        required={false}
        error={errors.niceToHaves}
        onChange={handleArrayFieldChange}
      />

      {/* Divider */}
      <div className="w-full h-px bg-[#D6DDEB]"></div>

      {/* Navigation Buttons */}
      <NavigationButtons onPrevious={onPrevious} onNext={handleNext} />
    </div>
  );
};

export default JobDescriptionStep;