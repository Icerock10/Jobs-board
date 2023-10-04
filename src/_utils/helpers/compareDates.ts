export const calculateDaysLeft = (dateObj: Date | string | number) => {
  const targetDate = new Date(dateObj).valueOf()
  const currentDate = new Date().valueOf()
  const timeDifference = targetDate - currentDate;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  if(daysRemaining <= 1) {
    const hoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60))
    return hoursRemaining <= 0 ? 'Expired' : `Active - ${hoursRemaining} hours left`
  }
  return `Active - ${daysRemaining} days left`
}