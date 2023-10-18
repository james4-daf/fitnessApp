import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createDailyWeight = mutation({
  args: {
    date: v.string(),
    weight: v.number(),
  },
  handler: async (ctx, args) => {
    const { weight, date } = args;
    await ctx.db.insert('dailyWeighIns', {
      date,
      weight,
    });
  },
});

export const getAllDailyWeight = query({
  handler: async (ctx) => {
    const dailys = await ctx.db.query('dailyWeighIns').collect();
    return dailys;
  },
});
export const deleteDailyWeight = mutation({
  args: { id: v.id('dailyWeighIns') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateDailyWeight = mutation({
  args: { id: v.id('dailyWeighIns'), weight: v.number() },
  handler: async (ctx, args) => {
    const { id, weight } = args;
    console.log(await ctx.db.get(args.id));

    // Add `tag` and overwrite `status`:
    await ctx.db.patch(id, { weight: weight });
    // console.log(await ctx.db.get(weight));
    // { text: "foo", tag: "bar", status: { archived: true }, _id: ... }
  },
});
