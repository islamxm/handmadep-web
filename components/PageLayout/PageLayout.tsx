import styles from './PageLayout.module.scss';
import {FC, useEffect} from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { PulseLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import Footer from '../Footer/Footer';
import { useWindowSize } from 'usehooks-ts';

const PageLayout:FC<{children?: React.ReactNode}> = ({
    children
}) => {
    const {width} = useWindowSize()
    const {loading} = useAppSelector(s => s.main)
    const {pathname} = useRouter()

    useEffect(() => console.log(pathname), [pathname])

    return (
        <div className={styles.wrapper}>
            {
                loading ? (
                    <div className={styles.load}>
                        <PulseLoader color='#fff' size={30}/>
                        <div className={styles.label}>...Initializing</div>
                    </div>
                ) : null
            }
            <Header/>
            <div className={styles.main}>
                {children}
            </div>
            <Menu/>
            {/* {(pathname === '/profile' && width > 1000) && <Footer/>} */}
        </div>
    )
}


export default PageLayout