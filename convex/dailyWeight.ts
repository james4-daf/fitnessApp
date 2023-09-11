import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const getDailyWeight = mutation({
  args: {
    weight: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { weight, date } = args;
    await ctx.db.insert('dailyWeighIns', {
      weight,
      date,
    });
  },
});
