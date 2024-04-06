export const timeAgo = (timestamp: string) => {
  const createAtDate: Date = new Date(timestamp);
  const now: Date = new Date();

  const secondsDifference: number = Math.floor((now.getTime() - createAtDate.getTime()) / 1000);

  if (secondsDifference < 60) {
    return `${Math.round(secondsDifference)}s`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes}m`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours}h`;
  } else if (secondsDifference < 604800) {
    const days = Math.floor(secondsDifference / 86400);
    return `${days}d`;
  } else {
    const weeks = Math.floor(secondsDifference / 604800);
    return `${weeks}w`;
  }
};
