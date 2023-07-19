import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg';
import { useState, FC, useEffect, useRef } from 'react';
import { searchItemType, searchTypes } from './types';
import Button from '../Button/Button';
import { Dropdown } from 'antd';
import Result from './components/Result/Result';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useDebounce } from 'usehooks-ts';
import Router from 'next/router';
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
    const ref = useRef<HTMLDivElement>(null)
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const {token} = useAppSelector(s => s)
    const debValue = useDebounce(value, 500)
    const [dropdownWidth, setDropdownWidth] = useState(0)
    

    const [list, setList] = useState<any[]>([])


    useEffect(() => {
        if(debValue !== '') {
            service.search(debValue).then(res => {
                console.log(res)
                setList(res)
            })
        } else {
            setList([])
        }
    }, [debValue])




    useEffect(() => {
        if(ref?.current) {
            setDropdownWidth(ref?.current?.scrollWidth)
        }
    }, [ref])

    const goToKeywordPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.which === 13 && e.key === 'Enter') {
            if(debValue?.length >= 3) {
                Router.push(`/search/${debValue}`)
            }
        }
    }

    const goToKeywordPageClick = () => {
        if(debValue?.length >= 3) {
            Router.push(`/search/${debValue}`)
        }
    }


    return (

        <Dropdown
            // open={focused || list?.length > 0}
            trigger={['click']}
            overlay={<Result width={dropdownWidth} items={list}/>}
            >
                <div ref={ref} className={`${styles.wrapper} ${focused ? styles.focused : ''}`}>
                    <div onClick={goToKeywordPageClick} className={styles.icon}>
                        <BiSearch/>
                    </div>

                    <div className={styles.body}>
                        <input
                            onKeyDown={goToKeywordPage}
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