import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface TechStackItem {
  id?: string;
  techStack: string;
}

interface EditTechStackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (techStack: TechStackItem[]) => void;
  techStack: TechStackItem[];
}

const EditTechStackDialog: React.FC<EditTechStackDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  techStack
}) => {
  const [items, setItems] = useState<TechStackItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItems(techStack.length > 0 ? [...techStack] : [{ techStack: '' }]);
    }
  }, [isOpen, techStack]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(item => item.techStack.trim() !== '');
    onSave(validItems);
    onClose();
  };

  const addItem = () => {
    setItems(prev => [...prev, { techStack: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, techStack: value } : item
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Tech Stack</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor={`tech-${index}`}>Technology {index + 1}</Label>
                  <Input
                    id={`tech-${index}`}
                    value={item.techStack}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="mt-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
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
            Add Technology
          </Button>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Tech Stack
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTechStackDialog;

