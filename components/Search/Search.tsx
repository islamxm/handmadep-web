import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg';
import { useState, FC } from 'react';
import { searchItemType, searchTypes } from './types';
import Button from '../Button/Button';
import { Dropdown } from 'antd';
import Result from './components/Result/Result';

const listMock:searchItemType[] = [
    {
        name: 'result 1'
    },
    {
        name: 'result 2'
    },
    {
        name: 'result 3'
    }
]




const Search:FC<searchTypes> = ({
    focus,
    closeSearch
}) => {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')



    return (

        <Dropdown
            trigger={['click']}
            overlay={<Result items={listMock} categories={listMock}/>}
            >
                <div className={`${styles.wrapper} ${focused ? styles.active : ''}`}>
                    <div className={styles.icon}>
                        <BiSearch/>
                    </div>

                    <div className={styles.body}>
                        <input 
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Search something"}
                            type="text"/>
                    </div>
                    <div className={`${styles.close} ${value ? styles.active : ''}`}>
                        <Button
                            round
                            variant={'transparent'}
                            icon={<CgClose size={20}/>}
                            />
                    </div>
                </div>
        </Dropdown>
    )
}


export default Search;