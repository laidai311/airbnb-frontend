"use client"

import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

import { Home } from 'lucide-react'
import { Wheat } from 'lucide-react';

const HomeFilter = () => {

    const property = [
        {
            id: "house",
            label: "House",
        },
        {
            id: "apartment",
            label: "Apartment",
        },
        {
            id: "guestHouse",
            label: "GuestHouse",
        },
    ]

    const essentials = [
        {
            id: "wifi",
            label: "Wifi",
        },
        {
            id: "kitchen",
            label: "Kitchen",
        },
        {
            id: "washer",
            label: "Washer",
        },
        {
            id: "dryer",
            label: "Dryer",
        },
        {
            id: "airConditioning",
            label: "Air conditioning",
        },
        {
            id: "heating",
            label: "Heating",
        },
        {
            id: "dedicatedWorkspace",
            label: "Dedicated workspace",
        },
        {
            id: "tv",
            label: "TV",
        },
        {
            id: "hairDryer",
            label: "Hair dryer",
        },
        {
            id: "iron",
            label: "Iron",
        }
    ]

    const FormSchema = z.object({
        beds: z.enum(["Any", "1", "2", "3", "4"], {
            required_error: "You need to select a notification type.",
        }),
        bathrooms: z.enum(["Any", "1", "2", "3", "4"], {
            required_error: "You need to select a notification type.",
        }),
        property: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        essentials: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        instantBook: z.boolean(),
        selfCheckin: z.boolean(),
        allowsPets: z.boolean(),
        topTier: z.boolean()
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            beds: "Any",
            bathrooms: "Any",
            property: [],
            instantBook: false,
            selfCheckin: false,
            allowsPets: false,
            topTier: false,
            essentials: []
        }
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild className='ml-5 mt-5'>
                <Button variant="outline">Filters</Button>
            </SheetTrigger>
            <SheetContent side={'bottom'} className='h-[calc(100vh-30px)] md:w-4/5 m-auto rounded-t-2xl p-0 overflow-scroll'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                        <SheetHeader className='mt-2 border-b pb-2 mb-6'>
                            <SheetTitle className='text-center'>Filters</SheetTitle>
                        </SheetHeader>
                        <div className='space-y-6'>
                            <FormField
                                control={form.control}
                                name="beds"
                                render={({ field }) => (
                                    <>
                                        <p className='mx-6 text-lg text-[#222] font-semibold'>Beds and bathrooms</p>
                                        <FormItem className="space-y-6 mx-6">
                                            <FormLabel className='text-base text-[#222] font-normal'>Beds</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex"
                                                >
                                                    <FormItem className="">
                                                        <FormControl className='hidden'>
                                                            <RadioGroupItem value="Any" />
                                                        </FormControl>
                                                        <FormLabel className={`${field.value === "Any" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>Any</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="">
                                                        <FormControl className='hidden'>
                                                            <RadioGroupItem value="1" />
                                                        </FormControl>
                                                        <FormLabel className={`${field.value === "1" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>1</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="">
                                                        <FormControl className='hidden'>
                                                            <RadioGroupItem value="2" />
                                                        </FormControl>
                                                        <FormLabel className={`${field.value === "2" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>2</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="">
                                                        <FormControl className='hidden'>
                                                            <RadioGroupItem value="3" />
                                                        </FormControl>
                                                        <FormLabel className={`${field.value === "3" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>3</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="">
                                                        <FormControl className='hidden'>
                                                            <RadioGroupItem value="4" />
                                                        </FormControl>
                                                        <FormLabel className={`${field.value === "4" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>4</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bathrooms"
                                render={({ field }) => (
                                    <FormItem className="space-y-6 mx-6 pb-12 border-b">
                                        <FormLabel className='text-base text-[#222] font-normal'>Bathrooms</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex"
                                            >
                                                <FormItem className="">
                                                    <FormControl className='hidden'>
                                                        <RadioGroupItem value="Any" />
                                                    </FormControl>
                                                    <FormLabel className={`${field.value === "Any" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>Any</FormLabel>
                                                </FormItem>
                                                <FormItem className="">
                                                    <FormControl className='hidden'>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel className={`${field.value === "1" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>1</FormLabel>
                                                </FormItem>
                                                <FormItem className="">
                                                    <FormControl className='hidden'>
                                                        <RadioGroupItem value="2" />
                                                    </FormControl>
                                                    <FormLabel className={`${field.value === "2" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>2</FormLabel>
                                                </FormItem>
                                                <FormItem className="">
                                                    <FormControl className='hidden'>
                                                        <RadioGroupItem value="3" />
                                                    </FormControl>
                                                    <FormLabel className={`${field.value === "3" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>3</FormLabel>
                                                </FormItem>
                                                <FormItem className="">
                                                    <FormControl className='hidden'>
                                                        <RadioGroupItem value="4" />
                                                    </FormControl>
                                                    <FormLabel className={`${field.value === "4" ? "bg-black text-white" : ""} px-[25px] py-[10px] rounded-[30px] border border-solid border-[#d5d0d0] hover:border-[#838181] cursor-pointer`}>4</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="topTier"
                                render={({ field }) => (
                                    <FormItem className="mx-6 pb-6 border-b">
                                        <div className='text-lg font-semibold pb-4'>Top-tier stays</div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <div>
                                                <FormLabel className={` ${field.value ? "border-[#838181] border-2 bg-[#f0f0ec]" : "border-[#d5d0d0] border"} flex flex-col px-6 py-5 rounded-lg hover:border-[#838181] cursor-pointer text-base`}>
                                                    <Wheat size={40} strokeWidth={1} />
                                                    <div className='text-base mt-4 mb-1'>Guest favorites</div>
                                                    <div className='text-xs font-normal text-[#717171]'>The most loved homes on Airbnb, according to guests</div>
                                                </FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    className='hidden'
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="property"
                                render={() => (
                                    <FormItem className='mx-6'>
                                        <div className="mb-4">
                                            <FormLabel className="text-lg font-semibold">Property type</FormLabel>
                                        </div>
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                            {property.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="property"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex"
                                                            >
                                                                <FormControl className='hidden'>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className={` ${field.value?.includes(item.id) ? "border-[#838181] border-2" : "border-[#d5d0d0] hover:border-[#838181] border"} flex flex-col w-full rounded-xl p-[16px] border-solid cursor-pointer gap-6`}>
                                                                    <Home size={32} strokeWidth={1} className='mb-3' />
                                                                    <div className='text-base text-[#222]'>{item.label}</div>
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="essentials"
                                render={() => (
                                    <FormItem className='mx-6'>
                                        <h3 className='text-lg py-6 border-t font-semibold'>Amenities</h3>
                                        <div className="mb-4">
                                            <FormLabel className="text-base font-semibold">Essentials</FormLabel>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
                                            {essentials.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="essentials"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="group flex flex-row md:flex-row-reverse md:justify-end md:gap-4 justify-between py-2.5 cursor-pointer"
                                                            >
                                                                <FormLabel className="font-normal text-base mt-1.5 h-[22px] cursor-pointer">
                                                                    {item.label}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Checkbox
                                                                        className='h-6 w-6 rounded border-[#B0B0B0] group-hover:border-[#504f4f] m-0'
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='mx-6 pt-8 pb-[90px] border-t'>
                                <h3 className="mb-4 text-lg font-semibold">Booking options</h3>
                                <div className='space-y-6'>
                                    <FormField
                                        control={form.control}
                                        name="instantBook"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between gap-2">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Instant Book
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Listings you can book without waiting for Host approval.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        className='hover:bg-[#B0B0B0]'
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="selfCheckin"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between gap-2">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Self check-in
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Easy access to the property once you arrive.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        className='hover:bg-[#B0B0B0]'
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="allowsPets"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between gap-2">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Allows pets
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Bringing a service animal?.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        className='hover:bg-[#B0B0B0]'
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <SheetFooter className='w-full md:w-4/5 flex flex-row justify-between sm:justify-between px-6 py-4 border-t fixed bottom-0 bg-white'>
                            <Button variant="ghost">Clear all</Button>
                            <Button type="submit">Show 864 places</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default HomeFilter