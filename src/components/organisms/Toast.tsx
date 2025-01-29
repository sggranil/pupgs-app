import toast from "react-hot-toast";
import { ReactElement } from "react";
import { DEFAULT_ERROR_ICON, DEFAULT_SUCCESS_ICON } from "@/components/molecules/ToastIcons";

const TOAST_DURATION = 2000;

function showToast(message: string, status: "success" | "error", icon: ReactElement | null = null, duration: number = TOAST_DURATION) {
  if (status === "error") {
    return toast.error(message, {
      duration: duration,
      position: "top-center",
      icon: icon ? icon : DEFAULT_ERROR_ICON,
    });
  }

  return toast.success(message, {
    duration: duration,
    position: "top-center",
    icon: icon ? icon : DEFAULT_SUCCESS_ICON,
  });
}

function removeToasts() {
  return toast.dismiss();
}

export { showToast, removeToasts };
