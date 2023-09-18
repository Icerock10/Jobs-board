export const setDraftFromDate = (daysLeft: number) => {
  const currentDate = new Date();
  return new Date(currentDate.getTime() + daysLeft * 24 * 60 * 60 * 1000);
}