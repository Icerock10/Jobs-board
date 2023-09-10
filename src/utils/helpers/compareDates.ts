export const calculateDaysLeft = (dateObj: Date | string | number) => {
  const targetDate = new Date(dateObj).valueOf()
  const currentDate = new Date().valueOf()
  const timeDifference = targetDate - currentDate;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 1000 ms * 60 s * 60 min
  if(daysRemaining <= 1) {
    const hoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60))
    return hoursRemaining <= 0 ? 'Expired' : `${hoursRemaining} hours left`
  }
  return `${daysRemaining} days left`
}