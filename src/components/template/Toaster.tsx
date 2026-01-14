import { ToastNotification } from '@/components/organisms/ToastNotification';
import toast from "react-hot-toast";
import { ReactElement } from "react";

const TOAST_DURATION = 2000;

function showToast(
  description: string,
  status: "success" | "error" | "info" | "warning",
  title: string | null = null, 
  icon: ReactElement | null = null,
  duration: number = TOAST_DURATION
) {
  return toast.custom((t) => (
    <ToastNotification
      t={t}
      status={status}
      title={title}
      description={description}
      customIcon={icon}
    />
  ), {
    duration: duration,
    position: "bottom-right",
    style: {
      margin: '20px'
    }
  });
}

function removeToasts() {
  return toast.dismiss();
}

export { showToast, removeToasts };