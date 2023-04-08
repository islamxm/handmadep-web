import { StaticImageData } from "next/image";

interface IUser {
    avatar?: string | StaticImageData,
    username?: string,
    // firstname?: string,
    // lastname?: string,
    email?: string,
    site?: URL | string,
    descr?: string
}

export default IUser;