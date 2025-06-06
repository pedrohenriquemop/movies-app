import { toast } from "sonner";
import { useCallback } from "react";

type NotificationType = "default" | "success" | "error" | "info" | "warning";

interface NotificationOptions {
  type?: NotificationType;
  description?: string;
  duration?: number;
}

export function useNotification() {
  const notify = useCallback((title: string, options?: NotificationOptions) => {
    const { type = "default", description, duration = 3000 } = options || {};

    switch (type) {
      case "success":
        toast.success(title, { description, duration });
        break;
      case "error":
        toast.error(title, { description, duration });
        break;
      case "info":
        toast.info(title, { description, duration });
        break;
      case "warning":
        toast.warning(title, { description, duration });
        break;
      default:
        toast(title, { description, duration });
    }
  }, []);

  return { notify };
}
