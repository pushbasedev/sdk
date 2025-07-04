import { getDifferenceInMinutes } from "../../../utils";

export function shouldRetrySubscription(
  lastSubscriptionRetryTime: string | null,
  retrySubscriptionIntervalDays: number
) {
  if (!lastSubscriptionRetryTime) return true;
  if (!Number.isInteger(retrySubscriptionIntervalDays)) return true;

  const now = new Date().toISOString();
  const elapsedTimeInMinutes = getDifferenceInMinutes(
    now,
    lastSubscriptionRetryTime
  );

  if (elapsedTimeInMinutes < 0) return true;

  const elapsedTimeInDays = elapsedTimeInMinutes / (60 * 24);

  return elapsedTimeInDays > retrySubscriptionIntervalDays;
}
