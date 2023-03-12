import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const modal = (type: string, message: string) => {
  if (type) {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
export default modal;
