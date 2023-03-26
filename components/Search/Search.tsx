import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'

const Search = () => {

    return (
        <div className={styles.wrapper}>
            {/* {
                !focused && !value ? (
                    <div className="MainSearch__icon">
                        <BiSearch/>
                    </div>
                ) : null
            } */}
            <div className={styles.icon}>
                <BiSearch/>
            </div>
            
            <div className={styles.body}>
                <input 
                    placeholder={"Search something"}
                    type="text"/>
            </div>
            {/* <div className={"MainSearch__icon MainSearch__clear" + (value ? ' active ' : '')}>
                <IconButton
                    onClick={() => setValue('')}
                    icon={<CgClose/>}
                    size={'20px'}
                    variant={'transparent'}
                    />
            </div> */}
        </div>
    )
}


export default Search;