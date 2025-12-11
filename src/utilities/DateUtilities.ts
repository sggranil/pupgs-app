export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const getLocalDateString = (isoString: string | undefined): string => {
    if (!isoString) return "";
    const date = new Date(isoString);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const getLocalTimeString = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);

    return date.toTimeString().split(" ")[0];
};

export const getLocalTimeStringFormatted = (isoString: string | undefined): string => {
    if (!isoString) return "";
    const date = new Date(isoString);

    const fullTime = date.toTimeString().split(" ")[0];
    return fullTime.substring(0, 5);
};

export function formatDate(isoString: string | number | Date) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export const makeIsoUTCDateTime = (
    dateString: string | undefined,
    timeString: string | undefined
): string => {
    if (!dateString || !timeString) {
        return "";
    }

    const localDateTimeString = `${dateString}T${timeString}`;
    const dateObject = new Date(localDateTimeString);
    return dateObject.toISOString();
};