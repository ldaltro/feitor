"use server";

import { db } from "@/lib/db";
import { subMonths } from "date-fns";
import { headers } from "next/headers";
import { getUserFromRequest } from "@/lib/auth";

export type DashboardStats = {
  totalAnimals: number;
  newAnimalsLastMonth: number;
  births: number;
  birthsLastMonth: number;
  transactions: {
    total: number;
    percentageChange: number;
  };
  upcomingEvents: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get user context for farm filtering
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    const userRole = headersList.get("x-user-role");
    
    // Get total animals and new animals in the last month
    const now = new Date();
    const oneMonthAgo = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);

    // Create base where clause for farm filtering
    let baseWhere = {};
    if (userRole === "ADMIN") {
      baseWhere = {};
    } else if (farmId) {
      baseWhere = { farmId };
    } else {
      // Users without farmId see data with default-farm-id (for backwards compatibility)
      baseWhere = { farmId: "default-farm-id" };
    }

    const totalAnimals = await db.animal.count({
      where: baseWhere,
    });
    const newAnimalsLastMonth = await db.animal.count({
      where: {
        ...baseWhere,
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    // Get total births and births in the last month
    const totalBirths = await db.birth.count({
      where: baseWhere,
    });
    const birthsLastMonth = await db.birth.count({
      where: {
        ...baseWhere,
        birthDate: {
          gte: oneMonthAgo,
        },
      },
    });

    // Get transactions value and percentage change
    const currentMonthTransactions = await db.transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        ...baseWhere,
        date: {
          gte: oneMonthAgo,
        },
      },
    });

    const previousMonthTransactions = await db.transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        ...baseWhere,
        date: {
          gte: twoMonthsAgo,
          lt: oneMonthAgo,
        },
      },
    });

    const currentSum = currentMonthTransactions._sum.value || 0;
    const previousSum = previousMonthTransactions._sum.value || 0;
    const percentageChange =
      previousSum > 0
        ? Math.round(((currentSum - previousSum) / previousSum) * 100)
        : 0;

    // Get upcoming events in the next 7 days
    const upcomingEvents = await db.event.count({
      where: {
        ...baseWhere,
        date: {
          gte: now,
          lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      },
    });

    return {
      totalAnimals,
      newAnimalsLastMonth,
      births: totalBirths,
      birthsLastMonth,
      transactions: {
        total: Math.round(currentSum),
        percentageChange,
      },
      upcomingEvents,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    // Return default values in case of error
    return {
      totalAnimals: 0,
      newAnimalsLastMonth: 0,
      births: 0,
      birthsLastMonth: 0,
      transactions: {
        total: 0,
        percentageChange: 0,
      },
      upcomingEvents: 0,
    };
  }
}
