import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CompanyProfileResponse } from '@/api/company.api';

interface EditCompanyDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<CompanyProfileResponse>) => void;
  company: CompanyProfileResponse;
}

const EditCompanyDetailsDialog: React.FC<EditCompanyDetailsDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  company
}) => {
  const [formData, setFormData] = useState({
    company_name: company.company_name || '',
    industry: company.industry || '',
    organisation: company.organisation || '',
    location: company.location || '',
    employees: company.employees || '',
    description: company.description || '',
    website: company.website || '',
    phone: company.phone || '',
    foundedDate: company.foundedDate || ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        company_name: company.company_name || '',
        industry: company.industry || '',
        organisation: company.organisation || '',
        location: company.location || '',
        employees: company.employees || '',
        description: company.description || '',
        website: company.website || '',
        phone: company.phone || '',
        foundedDate: company.foundedDate || ''
      });
    }
  }, [isOpen, company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Company Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organisation">Organization Type *</Label>
              <Input
                id="organisation"
                value={formData.organisation}
                onChange={(e) => handleChange('organisation', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employees">Employee Count</Label>
              <Input
                id="employees"
                value={formData.employees}
                onChange={(e) => handleChange('employees', e.target.value)}
                placeholder="e.g., 50-100, 1000+"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="foundedDate">Founded Date</Label>
            <Input
              id="foundedDate"
              type="date"
              value={formData.foundedDate}
              onChange={(e) => handleChange('foundedDate', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">About Us</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Tell us about your company..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyDetailsDialog;
