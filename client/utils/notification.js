import { toast } from 'react-toastify';

const notify = message => (
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  })
);

export default notify;
