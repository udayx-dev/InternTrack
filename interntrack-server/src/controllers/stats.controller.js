const Application = require("../models/Application.model");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/applications/stats/summary
const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Single aggregation pipeline — one DB round trip for all stats
  const [result] = await Application.aggregate([
    { $match: { userId } },
    {
      $facet: {
        // Count by status
        byStatus: [
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ],
        // Total count
        total: [
          { $count: "count" }
        ],
        // Applications added per day (last 7 days)
        weeklyActivity: [
          {
            $match: {
              createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
        // Upcoming deadlines (next 7 days)
        upcomingDeadlines: [
          {
            $match: {
              deadline: {
                $gte: new Date(),
                $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
              status: { $nin: ["Offer", "Rejected"] },
            },
          },
          { $sort: { deadline: 1 } },
          { $limit: 5 },
          { $project: { company: 1, role: 1, deadline: 1, status: 1 } },
        ],
      },
    },
  ]);

  const total = result.total[0]?.count || 0;

  // Convert byStatus array to a flat object: { Applied: 5, Offer: 2, ... }
  const statusMap = result.byStatus.reduce((acc, { _id, count }) => {
    acc[_id] = count;
    return acc;
  }, {});

  const offers = statusMap["Offer"] || 0;
  const offerRate = total > 0 ? ((offers / total) * 100).toFixed(1) : 0;

  res.status(200).json({
    success: true,
    stats: {
      total,
      offerRate: parseFloat(offerRate),
      byStatus: statusMap,
      weeklyActivity: result.weeklyActivity,
      upcomingDeadlines: result.upcomingDeadlines,
    },
  });
});

module.exports = { getSummary };
