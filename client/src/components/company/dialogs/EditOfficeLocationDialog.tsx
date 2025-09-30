import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus } from 'lucide-react';

interface OfficeLocation {
  id?: string;
  location: string;
  officeName: string;
  address: string;
  isHeadquarters: boolean;
}

interface EditOfficeLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (locations: OfficeLocation[]) => void;
  locations: OfficeLocation[];
}

const EditOfficeLocationDialog: React.FC<EditOfficeLocationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  locations
}) => {
  const [items, setItems] = useState<OfficeLocation[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItems(locations.length > 0 ? [...locations] : [{
        location: '',
        officeName: '',
        address: '',
        isHeadquarters: false
      }]);
    }
  }, [isOpen, locations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(item => 
      item.location.trim() !== '' && 
      item.officeName.trim() !== '' && 
      item.address.trim() !== ''
    );
    onSave(validItems);
    onClose();
  };

  const addItem = () => {
    setItems(prev => [...prev, {
      location: '',
      officeName: '',
      address: '',
      isHeadquarters: false
    }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OfficeLocation, value: string | boolean) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Office Locations</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Office Location {index + 1}</h4>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`officeName-${index}`}>Office Name *</Label>
                    <Input
                      id={`officeName-${index}`}
                      value={item.officeName}
                      onChange={(e) => updateItem(index, 'officeName', e.target.value)}
                      placeholder="e.g., Main Office, Branch Office"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`location-${index}`}>Location *</Label>
                    <Input
                      id={`location-${index}`}
                      value={item.location}
                      onChange={(e) => updateItem(index, 'location', e.target.value)}
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`address-${index}`}>Address *</Label>
                  <Textarea
                    id={`address-${index}`}
                    value={item.address}
                    onChange={(e) => updateItem(index, 'address', e.target.value)}
                    placeholder="Full address of the office"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`headquarters-${index}`}
                    checked={item.isHeadquarters}
                    onCheckedChange={(checked) => updateItem(index, 'isHeadquarters', checked as boolean)}
                  />
                  <Label htmlFor={`headquarters-${index}`} className="text-sm">
                    This is the headquarters
                  </Label>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Office Location
          </Button>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Locations
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOfficeLocationDialog;

