import { LuUser2 } from "react-icons/lu";
import {fetchProfileImage} from "@/utils/actions"
import Image from "next/image";


const UserIcon = async ()=> {
    const profileImage = await fetchProfileImage()

    if(profileImage){
        return <Image src={profileImage} alt="Profile Picture" height={24} width={24} className="rounded-full object-cover w-6 h-6" />
    }
    return (
        <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white p-[2px]" />
    )
}

export default UserIcon;
