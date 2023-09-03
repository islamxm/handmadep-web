import styles from './Slider.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper'
import {FC} from 'react';
import Image from 'next/image';
import placeholder from '@/public/assets/handmade-watermark.png';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';

const Slider:FC<{
    images?: string[],
    title?: string
}> = ({
    images,
    title
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
                    images && images.length > 0 ? (
                        images?.map((item, index) => (
                            <SwiperSlide className={styles.slide} key={index}>
                                <FancyboxWrapper>
                                    <a data-fancybox="gallery" href={item} className={styles.item}>
                                        <Image  
                                        src={item}
                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                        unoptimized 
                                        width={350}
                                        height={350}
                                        alt={title ? title : ''}
                                        />
                                    </a>
                                </FancyboxWrapper>
                                
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide className={styles.slide}>
                            <Image src={placeholder} alt=''/>
                        </SwiperSlide>
                    )
                }   
                {
                    images && images?.length > 1 ? (
                        <div className={'pag'}></div>   
                    ) : null
                }
               
            </Swiper>
        </div>
    )
}

export default Slider;