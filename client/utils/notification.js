import { toast } from 'react-toastify';

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
