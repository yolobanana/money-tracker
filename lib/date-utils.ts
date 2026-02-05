/**
 * Creates a Date object adjusted for UTC+7 (Asia/Jakarta timezone)
 * This ensures consistent date handling across server and client
 */
export function createDateUTC7(year: number, month: number, day: number): Date {
    // Create date in UTC, then adjust by -7 hours to get UTC+7 equivalent
    // month is 0-indexed for Date constructor
    const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    // Subtract 7 hours to convert from UTC to UTC+7
    // When it's midnight in UTC+7, it's 17:00 previous day in UTC
    utcDate.setUTCHours(utcDate.getUTCHours() - 7);
    return utcDate;
}

/**
 * Gets the start of month in UTC+7 timezone
 * @param year - Full year (e.g. 2026)
 * @param month - 1-indexed month (1 = January, 12 = December)
 */
export function getStartOfMonthUTC7(year: number, month: number): Date {
    return createDateUTC7(year, month - 1, 1);
}

/**
 * Gets the end of month (start of next month) in UTC+7 timezone
 * @param year - Full year (e.g. 2026)
 * @param month - 1-indexed month (1 = January, 12 = December)
 */
export function getEndOfMonthUTC7(year: number, month: number): Date {
    // Get start of next month
    if (month === 12) {
        return createDateUTC7(year + 1, 0, 1); // January of next year
    }
    return createDateUTC7(year, month, 1); // Next month same year
}
