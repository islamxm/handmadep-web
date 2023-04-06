import {toast} from 'react-toastify';
import {VscError} from 'react-icons/vsc';
import {AiOutlineCheckCircle,  AiOutlineInfoCircle} from 'react-icons/ai';


type notificationType = 'ERROR' | 'SUCCESS' | 'INFO'
type notificationObjType = {
    icon: React.ReactNode,
    themeColor: string
}

type switchFuncType = (type: notificationType) => notificationObjType

const switchType:switchFuncType = (type) => {
    switch(type) {
        case 'ERROR':
            return {
                icon: <VscError color='var(--error)'/>,
                themeColor: 'var(--error)'
            }
        case 'SUCCESS':
            return {
                icon: <AiOutlineCheckCircle color='var(--success)'/>,
                themeColor: 'var(--success)'
            }
        case 'INFO':
            return {
                icon: <AiOutlineInfoCircle color='var(--info)'/>,
                themeColor: 'var(--info)'
            }
    }
}


const notify = (text: string | React.ReactNode | number, type: notificationType = 'SUCCESS') => {
    toast(text, {
        icon: switchType(type).icon,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        closeButton: false,
        className: 'notify',
        progressStyle: {
            backgroundColor: switchType(type).themeColor
        } ,
        style: {
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 15,
            color: 'var(--black)',
        },
        
    })
}

export default notify;