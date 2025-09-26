import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle } from 'lucide-react';

interface CompanyVerificationProps {
  formData: {
    tax_id: string;
    logo: string;
    business_license: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (file: File, type: 'logo' | 'business_license') => Promise<void>;
  errors: Record<string, string>;
  uploading: { logo: boolean; business_license: boolean };
}

export const CompanyVerification = ({ 
  formData, 
  onInputChange, 
  onFileUpload, 
  errors, 
  uploading 
}: CompanyVerificationProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'business_license') => {
    const file = e.target.files?.[0];
    if (file) {
      await onFileUpload(file, type);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Verification & Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tax_id">Tax ID *</Label>
          <Input
            id="tax_id"
            name="tax_id"
            value={formData.tax_id}
            onChange={onInputChange}
            placeholder="Enter your company tax ID"
            className={errors.tax_id ? 'border-red-500' : ''}
          />
          {errors.tax_id && (
            <p className="text-sm text-red-500 mt-1">{errors.tax_id}</p>
          )}
        </div>

        <div>
          <Label>Company Logo</Label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
              disabled={uploading.logo}
              className="flex-1"
            />
            {uploading.logo && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Uploading...
              </div>
            )}
          </div>
          {formData.logo && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">✓ Logo uploaded successfully</p>
            </div>
          )}
        </div>

        <div>
          <Label>Business License</Label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'business_license')}
              disabled={uploading.business_license}
              className="flex-1"
            />
            {uploading.business_license && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Uploading...
              </div>
            )}
          </div>
          {formData.business_license && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">✓ Business license uploaded successfully</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Verification Process</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your company profile will be reviewed by our team. This usually takes 1-2 business days. 
                You'll receive an email notification once the verification is complete.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
