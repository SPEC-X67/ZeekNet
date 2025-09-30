import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Plus, 
  Mail,
  Phone,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';

interface CompanyContact {
  id?: string;
  email: string;
  phone: string;
  twitterLink: string;
  facebookLink: string;
  linkedin: string;
}

interface CompanyContactSectionProps {
  contacts: CompanyContact[];
  onAdd: () => void;
  onEdit: (contact: CompanyContact) => void;
}

const CompanyContactSection: React.FC<CompanyContactSectionProps> = ({ 
  contacts, 
  onAdd, 
  onEdit 
}) => {
  const hasContacts = contacts.length > 0;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-1.5" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          {hasContacts && (
            <Button variant="outline" size="sm" className="p-1.5" onClick={() => onEdit(contacts[0])}>
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!hasContacts ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No contact information added yet</div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Contact Information
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {contacts.map((contact, index) => (
            <div key={contact.id || index} className="space-y-2.5">
              {/* Email */}
              {contact.email && (
                <div className="flex items-center gap-3 px-2.5 py-1.5 border border-primary rounded-lg text-primary">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium text-sm">{contact.email}</span>
                </div>
              )}

              {/* Phone */}
              {contact.phone && (
                <div className="flex items-center gap-3 px-2.5 py-1.5 border border-primary rounded-lg text-primary">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium text-sm">{contact.phone}</span>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-2.5">
                {contact.twitterLink && (
                  <div className="flex items-center gap-3 px-2.5 py-1.5 border border-primary rounded-lg text-primary">
                    <Twitter className="h-4 w-4" />
                    <span className="font-medium text-sm">Twitter</span>
                  </div>
                )}
                {contact.facebookLink && (
                  <div className="flex items-center gap-3 px-2.5 py-1.5 border border-primary rounded-lg text-primary">
                    <Facebook className="h-4 w-4" />
                    <span className="font-medium text-sm">Facebook</span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center gap-3 px-2.5 py-1.5 border border-primary rounded-lg text-primary">
                    <Linkedin className="h-4 w-4" />
                    <span className="font-medium text-sm">LinkedIn</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyContactSection;

