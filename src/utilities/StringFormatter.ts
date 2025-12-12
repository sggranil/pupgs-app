export const formatStatus = (status: string | null | undefined): string => {
  if (!status) {
    return "Pending Review";
  }

  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatSnakeCase = (inputString: string | undefined): string => {
  if (!inputString || inputString.trim() === "") {
    return "pending_review";
  }

  const separatorRegex = /[\s-]+/g;

  return inputString
    .toLowerCase()
    .replace(separatorRegex, '_');
};