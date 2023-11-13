import React, { useContext, useEffect } from "react";
import { Context } from "../utils/Context";

export default function Alert({ show, message, type }) {
    const context = useContext(Context)
    const { state, setState } = context;

    useEffect(() => {

        if (show) {
            setTimeout(() => {
                setState({ ...state, alert: { show: false, type: 'alert', message:state.alert.message } })
            }, 3300)
        }
    }, [show])

    return ( // d-none
        <div class="alert alert-danger d-flex align-items-center" role="alert" style={{ width: '50%', position: 'absolute', right: 10, top: state.alert.show ? 55 : -100, transition: '0.5s', gap:30 }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" role="img" aria-label="Warning:" width="18" height="18">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
                {message}
            </div>
        </div>
    )
}