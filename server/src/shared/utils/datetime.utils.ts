export class DateTimeUtil {
  /**
   * Format date to YYYY-MM-DD format for log file names
   * @param date - Date to format
   * @returns Formatted date string
   */
  static getFormatedDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
