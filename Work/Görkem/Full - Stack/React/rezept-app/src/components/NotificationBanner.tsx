import { useEffect } from "react";

type Props = { 
    message: string
    onClose: () => void;
    duration?: number;
};

export default function NotificationBanner({ message, onClose, duration = 2000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="notification-banner">
      {message}
    </div>
  );
}
