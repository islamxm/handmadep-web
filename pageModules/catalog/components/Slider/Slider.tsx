import styles from './Slider.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper'
import {FC} from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import placeholder from '@/public/assets/handmade-watermark.png';
import img1 from '@/public/assets/img1.jpeg'
import img2 from '@/public/assets/img2.jpg'

const testImgs = [img1, img2];


const Slider:FC<{
    images?: string[] | StaticImageData[]
}> = ({
    images
}) => {



    return (
        <div className={styles.wrapper}>
            <Swiper
                pagination={{
                    el: '.pag',
                    type: 'bullets',
                    bulletClass: 'pag__item',
                    bulletActiveClass: 'active',
                    clickable: true
                }}
                spaceBetween={20}
                modules={[Pagination]}
                className={styles.slider}>
                {
                    testImgs && testImgs.length > 0 ? (
                        testImgs?.map((item, index) => (
                            <SwiperSlide className={styles.slide} key={index}>
                                <Image placeholder={'blur'} src={item} alt=''/>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide className={styles.slide}>
                            <Image src={placeholder} alt=''/>
                        </SwiperSlide>
                    )
                }   
                <div className={'pag'}></div>   
            </Swiper>
        </div>
    )
}

export default Slider;