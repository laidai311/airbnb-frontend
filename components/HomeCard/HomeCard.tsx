"use client"

import React from "react"

import { Card } from "@/components/ui/card"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Heart } from 'lucide-react'
import { Star } from 'lucide-react'

const HomeCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-3 ml-5 mr-5">
            <Card className="border-none shadow-none">
                <a href="">
                    <div className="relative z-10">
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="mySwiper"
                        >
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                            <SwiperSlide><img className="rounded-xl object-cover aspect-square" src="https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720" alt="image-card" /></SwiperSlide>
                        </Swiper>
                        <Heart className="absolute top-2.5 right-2.5 z-20"/>
                    </div>
                    <div className="flex justify-between mt-3">
                        <h1 className="text-[15px] font-semibold text-[#222222]">Bujra, Ấn Độ</h1>
                        <div className="flex justify-center items-center">
                            <Star size={12} className="mr-0.5"/>
                            <p>4.9</p>
                        </div>
                    </div>
                    <p className="text-[15px] text-[#717171]">Được xây vào năm 2020</p>
                    <p className="text-[15px] text-[#717171]">Ngày 04 - Ngày 09 tháng 12</p>
                    <p className="text-[15px] mt-1.5"><span className="font-semibold">$1.097</span>/đêm</p>
                </a>
            </Card>
        </div>
    )
}

export default HomeCard