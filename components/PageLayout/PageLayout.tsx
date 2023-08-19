import styles from './PageLayout.module.scss';
import {FC} from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { PulseLoader } from 'react-spinners';

const PageLayout:FC<{children?: React.ReactNode}> = ({
    children
}) => {
    const {loading} = useAppSelector(s => s.main)

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
            {children}
            <Menu/>
        </div>
    )
}


export default PageLayout