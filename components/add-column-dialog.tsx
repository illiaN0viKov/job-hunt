"use client"

import React, { useState } from 'react'
import {Dialog,  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import type { Column } from '@/lib/models/models.types';
import { createColumn } from '@/lib/actions/columns';

interface CreateJobApplicationDialogProps {
  boardId: string;
  columns: Column[]
}



const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];



const AddColumnDialog = ({boardId, columns}: CreateJobApplicationDialogProps) => {

    const [open, setOpen] = useState<boolean>(false);
    const [selectedColumn, setSelectedColumn] = useState<string>("");

  const missingColumns = DEFAULT_COLUMNS.filter(defaultCol =>
    !columns.some(col => col.name === defaultCol.name)
  )

  function handleColumnAdd(event: React.FormEvent) {
    event.preventDefault();

    if (!selectedColumn) {
      console.error("Please select a column");
      return;
    }

    try {

      const columnToAdd = DEFAULT_COLUMNS.find(col => col.name === selectedColumn);
      
      if (!columnToAdd) {
        console.error("Column not found");
        return;
      }

        createColumn({
          boardId,
          name: columnToAdd.name,
        });      
        
      setSelectedColumn("");
      setOpen(false);
    } catch (e) {
      console.error("Failed to add column:", e);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Column
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
          <DialogDescription>Add a new column to organize your job applications</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleColumnAdd} id="addColumnForm">
          <div className="space-y-2">
            <Label htmlFor="column">Select Column</Label>
            <select
              id="column"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Choose a column...</option>
              {missingColumns.map((col, index) => (
                <option key={index} value={col.name}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="addColumnForm">
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddColumnDialog