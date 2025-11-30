import React, { ReactElement } from 'react';
import toast, { Toast } from 'react-hot-toast';

interface ToastNotificationProps {
    t: Toast;
    status: 'success' | 'error' | 'info' | 'warning';
    title: string | null;
    description: string;
    customIcon?: ReactElement | null;
}

const statusConfig = {
    success: {
        text: "Success",
        borderColor: 'border-l-state-success',
        textColor: 'text-state-success',
        icon: (
            <span className="material-symbols-outlined text-state-success" style={{ fontSize: '2rem' }}>
                check_circle
            </span>
        ),
    },
    error: {
        text: "Error",
        borderColor: 'border-l-state-danger',
        textColor: 'text-state-danger',
        icon: (
            <span className="material-symbols-outlined text-state-danger" style={{ fontSize: '2rem' }}>
                cancel
            </span>
        ),
    },
    info: {
        text: "Info",
        borderColor: 'border-l-state-info',
        textColor: 'text-state-info',
        icon: (
            <span className="material-symbols-outlined text-state-info" style={{ fontSize: '2rem' }}>
                info
            </span>
        ),
    },
    warning: {
        text: "Warning",
        borderColor: 'border-l-state-warning',
        textColor: 'text-state-warning',
        icon: (
            <span className="material-symbols-outlined text-state-warning" style={{ fontSize: '2rem' }}>
                warning
            </span>
        ),
    },
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({ t, status, title, description, customIcon }) => {
    const config = statusConfig[status];
    const finalTitle = title ?? config.text
    const finalIcon = customIcon ? customIcon : config.icon;

    return (
        <div
            style={t.style}
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-xs w-full bg-app-background shadow-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition-opacity duration-500 ease-out`}
        >
            <div className={`flex-1 w-0 p-4 rounded-l-lg border-l-4 ${config.borderColor} border-app-surface`} style={{ borderLeftWidth: '10px' }}>
                <div className="flex items-center">
                    <div className="flex-shrink-0 pt-0.5">{finalIcon}</div>

                    <div className="ml-3 flex-1">
                        <p className="text-sm font-bold text-content-primary">{finalTitle}</p>
                        <p className="mt-1 text-sm text-content-secondary">{description}</p>
                    </div>
                </div>
            </div>

            <div className="flex">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toast.dismiss(t.id);
                    }}
                    className="w-full border-transparent rounded-r-lg p-3 flex items-center justify-center text-sm font-medium text-content-secondary hover:text-content-primary"
                    aria-label="Close notification"
                >
                    <span className="material-symbols-rounded text-content-primary text-3xl">
                        close
                    </span>
                </button>
            </div>
        </div>
    );
};