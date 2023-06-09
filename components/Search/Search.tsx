import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg';
import { useState, FC, useEffect } from 'react';
import { searchItemType, searchTypes } from './types';
import Button from '../Button/Button';
import { Dropdown } from 'antd';
import Result from './components/Result/Result';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useDebounce } from 'usehooks-ts';
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

const service = new ApiService()




const Search:FC<searchTypes> = ({
    focus,
    closeSearch
}) => {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const {token} = useAppSelector(s => s)
    const debValue = useDebounce(value, 500)


    useEffect(() => {
        if(debValue !== '') {
            service.search(debValue).then(res => {
                console.log(res)
            })
        }
    }, [debValue])





    return (

        <Dropdown
            trigger={['click']}
            overlay={<Result items={listMock}/>}
            >
                <div className={`${styles.wrapper} ${focused ? styles.focused : ''}`}>
                    <div className={styles.icon}>
                        <BiSearch/>
                    </div>

                    <div className={styles.body}>
                        <input
                            onBlur={() => setFocused(false)}
                            onFocus={() => setFocused(true)} 
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Search something"}
                            value={value}
                            type="text"/>
                    </div>
                    <div className={`${styles.close} ${value ? styles.active : ''}`}>
                        <Button
                            onClick={() => setValue('')}
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