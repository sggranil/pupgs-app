export const formatStatus = (status: string | null): string => {
  if (!status) {
    return "Pending Review";
  }

  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};