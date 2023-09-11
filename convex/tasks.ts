import { query } from './_generated/server';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  handler: async (ctx) => {
    return ctx.db.query('tasks').collect();
  },
});
