import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface CompanyDetailsProps {
  formData: {
    industry: string;
    organisation: string;
    employees: string;
    description: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

export const CompanyDetails = ({ formData, onInputChange, errors }: CompanyDetailsProps) => {
  const employeeOptions = [
    '1-10',
    '11-50', 
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ];

  const organisationOptions = [
    'Corporation',
    'LLC',
    'Partnership',
    'Sole Proprietorship',
    'Non-profit',
    'Government',
    'Other'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Company Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="industry">Industry *</Label>
          <Input
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={onInputChange}
            placeholder="e.g., Technology, Healthcare, Finance"
            className={errors.industry ? 'border-red-500' : ''}
          />
          {errors.industry && (
            <p className="text-sm text-red-500 mt-1">{errors.industry}</p>
          )}
        </div>

        <div>
          <Label htmlFor="organisation">Organisation Type *</Label>
          <select
            id="organisation"
            name="organisation"
            value={formData.organisation}
            onChange={onInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.organisation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select organisation type</option>
            {organisationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.organisation && (
            <p className="text-sm text-red-500 mt-1">{errors.organisation}</p>
          )}
        </div>

        <div>
          <Label htmlFor="employees">Number of Employees *</Label>
          <select
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={onInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.employees ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select employee count</option>
            {employeeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.employees && (
            <p className="text-sm text-red-500 mt-1">{errors.employees}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Company Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Tell us about your company, its mission, and what makes it unique..."
            rows={4}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
