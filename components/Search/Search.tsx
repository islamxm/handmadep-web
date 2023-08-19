import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg';
import { useState, FC, useEffect, useRef } from 'react';
import { searchItemType, searchTypes } from './types';
import Button from '../Button/Button';
import { Dropdown } from 'antd';
import Result from './components/Result/Result';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { useDebounce } from 'usehooks-ts';
import Router, { useRouter } from 'next/router';
import { main_closeSearch } from '@/store/slices/mainSlice';
import {useWindowSize} from 'usehooks-ts';


const service = new ApiService()




const Search:FC<any> = ({
    // focus,
    // closeSearch
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize()
    const dispatch = useAppDispatch()
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    
    const router = useRouter()
    const debValue = useDebounce(value, 500)
    const [dropdownWidth, setDropdownWidth] = useState(0)
    const [page, setPage] = useState(1)
    
    const [list, setList] = useState<any[]>([])

    const [dropdownOpen, setDropdownOpen] = useState(false)


    const getData = () => {
        if(debValue !== '' && page) {
            service.search(debValue, page).then(res => {
                if(res?.length > 0) {
                    if(page === 1) {
                        setList(res)
                    } else {
                        setList(s => [...s, ...res])
                    }
                }
            })
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        if(page === 1) {
            getData()
        } else {
            setPage(1)
        }
    }, [debValue])

    

    useEffect(() => {
        setFocused(false)
        dispatch(main_closeSearch())
    }, [router])

    useEffect(() => {
        if(ref?.current) {
            setDropdownWidth(ref?.current?.scrollWidth)
        }
    }, [ref])

    const goToKeywordPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.which === 13 && e.key === 'Enter') {
            if(value?.length >= 3) {
                Router.push(`/search/${value}`)
            }
        }
    }

    const goToKeywordPageClick = () => {
        if(value?.length >= 3) {
            Router.push(`/search/${value}`)
        }
    }


    useEffect(() => {
        if(focused && list?.length > 0) {
            setDropdownOpen(true)
        } else {
            setDropdownOpen(false)
        }
    }, [focused, list])


    useEffect(() => {
        setDropdownOpen(false)
    }, [router])


    return (

        <Dropdown
            open={dropdownOpen}
            trigger={['click']}
            overlay={<Result onClose={() => setDropdownOpen(false)} setPage={setPage} width={dropdownWidth} items={list}/>}
            >
                <div ref={ref} className={`${styles.wrapper} ${focused ? styles.focused : ''}`}>
                    <div onClick={goToKeywordPageClick} className={styles.icon}>
                        <BiSearch/>
                    </div>

                    <div className={styles.body}>
                        <input
                            onKeyDown={goToKeywordPage}
                            onBlur={() => {
                                setFocused(false)
                                dispatch(main_closeSearch())
                            }}
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