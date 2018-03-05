import { toast } from 'react-toastify';

/**
 * Toaster notification
 *
 * @param {string} type - Type of toast message
 * @param {string} message - Message info to display
 *
 * @returns {any} Toast message
 */
const notify = (type, message) => {
  switch (type) {
    case 'success':
      return (
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
    case 'info':
      return (
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
    case 'error':
      return (
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
    default: break;
  }
};

export default notify;
