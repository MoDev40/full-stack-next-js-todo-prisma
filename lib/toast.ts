import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (info:string)=>toast.success(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
});
export const infoToast = (info:string)=>toast.info(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
});
export const warningToast = (info:string)=>toast.warn(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
});
