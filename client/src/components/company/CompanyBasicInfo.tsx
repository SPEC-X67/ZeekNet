import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

interface CompanyBasicInfoProps {
  formData: {
    company_name: string;
    email: string;
    website: string;
    location: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

export const CompanyBasicInfo = ({ formData, onInputChange, errors }: CompanyBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Basic Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={onInputChange}
            placeholder="Enter your company name"
            className={errors.company_name ? 'border-red-500' : ''}
          />
          {errors.company_name && (
            <p className="text-sm text-red-500 mt-1">{errors.company_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Company Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="company@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website">Website *</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={onInputChange}
            placeholder="https://www.company.com"
            className={errors.website ? 'border-red-500' : ''}
          />
          {errors.website && (
            <p className="text-sm text-red-500 mt-1">{errors.website}</p>
          )}
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            placeholder="City, Country"
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">{errors.location}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
