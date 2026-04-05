
"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column as ColumnModel, JobApplication } from "../models";
import type { Column } from "../models/models.types";

interface ColumnData extends Omit<Column, "_id" | "jobApplications" | "order"> {
  boardId: string;
}

export async function createColumn({boardId, name}: ColumnData) {
  const session = await getSession();

    if (!session?.user) {
      return { error: "Unauthorized" };
    }
  
    await connectDB();

        if (!name) {
    return { error: "Missing required fields" };
  }

    // Verify board ownership
    const board = await Board.findOne({
      _id: boardId,
      userId: session.user.id,
    });


      if (!board) {
    return { error: "Board not found" };
  }

    // Get min order from existing columns in this board
    const minOrder = (await ColumnModel.findOne({ boardId })
      .sort({ order: 1 })
      .select("order")
      .lean()) as { order: number } | null;

    // New column will be first (order 0), shift existing columns
    if (minOrder !== null) {
      // Increment all existing columns' order by 1
      await ColumnModel.updateMany(
        { boardId },
        { $inc: { order: 1 } }
      );
    }

    // Create new column with order 0
    const newColumn = new ColumnModel({
      name,
      boardId,
      order: 0,
      jobApplications: [],
    });

    await newColumn.save();

    // Add column to board
    await Board.findByIdAndUpdate(boardId, {
      $push: { columns: newColumn._id },
    });

    revalidatePath("/dashboard");

    return { success: true, column: newColumn };
  }

export async function deleteColumn(id: string) {
  await connectDB(); // still needed

  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const column = await ColumnModel.findById(id);

  if (!column) {
    return { error: "Column not found" };
  }

  const board = await Board.findById(column.boardId);

  if (!board) {
    return { error: "Board not found" };
  }

  if (board.userId.toString() !== session.user.id) {
    return { error: "Unauthorized" };
  }

  // ✅ delete all jobs in this column
  await JobApplication.deleteMany({ columnId: id });

  // ✅ remove column from board
  await Board.findByIdAndUpdate(column.boardId, {
    $pull: { columns: id },
  });

  // ✅ delete column
  await ColumnModel.deleteOne({ _id: id });

  revalidatePath("/dashboard");

  return { success: true };
}


