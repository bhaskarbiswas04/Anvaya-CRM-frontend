import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({children}) {
    const [toast, setToast] = useState(null);

    const showToast = ( message, type = "success")=>{
        setToast({message, type});

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    return (
      <ToastContext.Provider value={{ showToast }}>
        {children}

        {toast && (
          <div className={`toast-container position-fixed top-0 end-0 p-3`}>
            <div
              className={`toast show text-white bg-${
                toast.type === "error" ? "danger" : "success"
              }`}
            >
              <div className="toast-body">{toast.message}</div>
            </div>
          </div>
        )}
      </ToastContext.Provider>
    );
}

export const useToast = ()=> useContext(ToastContext);