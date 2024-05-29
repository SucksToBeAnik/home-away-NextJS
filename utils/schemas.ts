import * as z from "zod"

import { ZodSchema } from "zod"


export const profileSchema = z.object({
    firstName: z.string().min(2, {
        message:"First name must at least be 2 characters"
    }),
    lastName: z.string().min(2, {
        message:"First name must at least be 2 characters"
    }),
    username: z.string().min(2, {
        message:"Username must at least be 2 characters"
    })
})

export function validateWithZodSchema<T>(schema:ZodSchema<T>, data:unknown):T{
    const result = schema.safeParse(data);

    if(!result.success){
        const errors = result.error.errors.map((err)=>err.message)
        throw new Error(errors.join(','))
    }

    return result.data
}

export const ImageSchema = z.object({
    image: validateFile()
})

function validateFile(){
    const maxUploadSize = 1024 * 1024
    const acceptedFilesTypes = ['image/']

    return z.instanceof(File).refine((file)=>{
        return !file || file.size <= maxUploadSize
    },'File size must be less than 1 MB').refine((file)=>{
        return !file || acceptedFilesTypes.some((type)=>file.type.startsWith(type))
    },'File must be an image')
}

export const propertySchema = z.object({
    name: z.string().min(2, {message:"Name must be at least 2 characters"}).max(100,{message:"Name must be less than 100 characters"}),
    tagline: z.string().min(2, {message:"Tagline must be at least 2 characters"}).max(100,{message:"Tagline must be less than 100 characters"}),
    price: z.coerce.number().int().min(0, {message:"Price must be a positive number"}),
    description: z.string().refine((description)=>{
        const wordCount = description.split(' ').length
        return wordCount >= 10 && wordCount <= 100
    }),
    country: z.string(),
    guests: z.coerce.number().int().min(0,{message:"Guest amount must be a positive number"}),
    bedrooms: z.coerce.number().int().min(0, {
        message: 'Bedroom amount must be a positive number'
    }),
    beds: z.coerce.number().int().min(0, {
        message: 'Bed amount must be a positive number'
    }),
    baths: z.coerce.number().int().min(0, {
        message: 'Bath amount must be a positive number'
    }),
    amenities: z.string()
})