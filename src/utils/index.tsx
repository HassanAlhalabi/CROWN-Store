import toast, { ToastOptions } from "react-hot-toast";

export const handleFireBaseErrorMessage = (message: string) => {
    // Slice Message
    return message.slice(message.indexOf(' ') + 1)
}

// Notification
type Notification = 'SUCCESS' | 'ERROR' | 'LOADING' | 'CUSTOM' | 'BLANK';
export const notify = (type: Notification = 'BLANK', message: string, config?: ToastOptions) => {
    switch (type) {
        case 'SUCCESS':
            return toast.success(message,config);
        case 'ERROR':
            return toast.error(message,config); 
        case 'CUSTOM':
            return toast.custom(message,config);
        case 'LOADING':
            return toast.loading(message,config);
        default:
            return toast(message,config); ;
    }
}