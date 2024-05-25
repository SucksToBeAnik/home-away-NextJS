"use server";

import { db } from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { profileSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// helper fucntion
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

// end of helper dunction

export const CreateProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.safeParse(rawData);

    if(!validatedFields.success){
        const errors = validatedFields.error.errors.map((err)=>err.message)
        throw new Error(errors.join(','))
    }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields.data,
    });

    revalidatePath("/");
    return { message: "Profile updated" };
  } catch (error) {
    return renderError(error)
  }
  
};
