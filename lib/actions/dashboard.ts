"use server";

import { db } from "@/lib/db";
import { subMonths } from "date-fns";

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
    // Get total animals and new animals in the last month
    const now = new Date();
    const oneMonthAgo = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);

    const totalAnimals = await db.animal.count();
    const newAnimalsLastMonth = await db.animal.count({
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    // Get total births and births in the last month
    const totalBirths = await db.birth.count();
    const birthsLastMonth = await db.birth.count({
      where: {
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
