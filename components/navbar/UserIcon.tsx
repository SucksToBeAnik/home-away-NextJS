import { LuUser2 } from "react-icons/lu";
import {fetchProfileImage} from "@/utils/actions"
import Image from "next/image";


const UserIcon = async ()=> {
    const profileImage = await fetchProfileImage()

    if(profileImage){
        console.log(profileImage);
        return <Image src={profileImage} alt="Profile Picture" height={30} width={30} className="rounded-full object-cover" />
    }
    return (
        <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white p-[2px]" />
    )
}

export default UserIcon;
