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

export const getFormattedDate = (isoString: string | undefined): string => {
    if (!isoString) return "";
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
};

export const getOneHourTimeRange = (isoString: string | undefined): string => {
    if (!isoString) return "";

    const startDate = new Date(isoString);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    const startTime = startDate.toLocaleTimeString('en-US', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-US', timeOptions);

    return `${startTime} - ${endTime}`;
};

export const getLocalTimeString = (isoString: string | undefined): string => {
    if (!isoString) return "";
    const date = new Date(isoString);

    return date.toLocaleTimeString().split(" ")[0]; // it should be like 4:00 PM - 5:00 PM, add 1 hour
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