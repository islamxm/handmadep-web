import { StaticImageData } from "next/image";

interface IUser {
    avatar?: string | StaticImageData,
    username?: string,
    // firstname?: string,
    // lastname?: string,
    email?: string,
    avatar_image?: string,
    id?: number
    site?: string,
    about?: string,
    image?: string
}

export default IUser;