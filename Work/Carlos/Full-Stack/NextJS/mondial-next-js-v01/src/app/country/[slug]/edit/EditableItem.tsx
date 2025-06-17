// app/country/[slug]/edit/EditableItem.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

type EditableItemProps = {
  name: string;
  percentage: number;
  countryCode: string;
  countryName: string;
  onDelete: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
  itemType: 'language' | 'religion';
};

export default function EditableItem({ 
  name, 
  percentage, 
  countryCode, 
  countryName, 
  onDelete, 
  onUpdate,
  itemType
}: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPercentage, setEditedPercentage] = useState(percentage);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('countryCode', countryCode);
    formData.append('countryName', countryName);
    formData.append('originalName', name);
    formData.append(`${itemType}Name`, editedName);
    formData.append(`${itemType}Percentage`, editedPercentage.toString());
    
    onUpdate(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedName(name);
    setEditedPercentage(percentage);
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <li className="flex items-center text-gray-300 py-2 border-b border-gray-700">
        <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-grow px-2 py-1 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="number"
            value={editedPercentage}
            onChange={(e) => setEditedPercentage(parseFloat(e.target.value))}
            min="0.1"
            max="100"
            step="0.1"
            className="w-20 px-2 py-1 bg-gray-700 text-white rounded"
            required
          />
          <div className="flex gap-1">
            <button
              type="submit"
              className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
              title="Save changes"
            >
              <FaSave size={14} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 bg-violet-400 text-white rounded-full hover:bg-violet-600 transition-colors cursor-pointer"
              title="Cancel"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </form>
      </li>
    );
  }
  
  return (
    <li className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700">
      <div>
        <span className="font-medium">{name}</span>
        <span className="ml-2 text-emerald-400">{percentage}%</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
          title={`Edit ${itemType}`}
        >
          <FaPencilAlt size={14} />
        </button>
        
        <form action={onDelete}>
          <input type="hidden" name="countryCode" value={countryCode} />
          <input type="hidden" name="countryName" value={countryName} />
          <input type="hidden" name={`${itemType}Name`} value={name} />
          <button
            type="submit"
            className="p-2 bg-violet-400 text-white rounded-full hover:bg-violet-600 transition-colors cursor-pointer"
            title={`Delete ${itemType}`}
          >
            <FaTrashAlt size={14} />
          </button>
        </form>
      </div>
    </li>
  );
}