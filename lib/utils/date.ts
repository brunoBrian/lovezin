import { startOfToday } from "date-fns";
import { after } from "node:test";

export { formatDateToBrazilian as formatDate } from "./date-formatter";
export { calculateDuration } from "./time";

export function getDisabledDays(): Date[] {
  // Disable only dates before today
  return [{ after: startOfToday() }] as any;
}
