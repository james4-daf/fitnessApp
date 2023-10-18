import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  dailyWeighIns: defineTable({
    date: v.string(),
    weight: v.number(),
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
});
