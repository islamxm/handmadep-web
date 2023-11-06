import styles from './Search.module.scss';
import {BiSearch} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg';
import {useState, FC, useEffect, useRef} from 'react';
import Button from '../Button/Button';
import Result from './components/Result/Result';
import ApiService from '@/service/apiService';
import {useAppDispatch} from '@/hooks/useTypesRedux';
import {useDebounce} from 'usehooks-ts';
import Router, {useRouter} from 'next/router';
import {main_closeSearch} from '@/store/slices/mainSlice';
import apiSlice from "@/store/slices/apiSlice";
import OutsideClickHandler from 'react-outside-click-handler';
import {LoadingOutlined} from '@ant-design/icons';
import getClassNames from '@/helpers/getClassNames';





const Search: FC<any> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [search] = apiSlice.endpoints?.search.useLazyQuery()
  const dispatch = useAppDispatch()
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  const router = useRouter()
  const debValue = useDebounce(value, 500)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const [page, setPage] = useState(0)

  const [list, setList] = useState<any[]>([])

  const [dropdownOpen, setDropdownOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [canLoadNext, setCanLoadNext] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const getData = () => {
    // if (debValue !== '' && page) {
    //   setIsLoading(true)
    //   setCanLoadNext(false)
    //   search({query_string: debValue, last_id: page}).then(res => {
    //     if(res?.data?.results?.length === 0) setIsEnd(true) 
    //     if(page === 1) {
    //       setList(res?.data?.results)
    //     } else {
    //       setList(s => [...s, ...res?.data?.results]) 
    //     }
    //   }).finally(() => {
    //     setIsLoading(false)
    //     setCanLoadNext(true)
    //   })
    // }
  }

  useEffect(() => {
    getData()
  }, [page])

  useEffect(() => {
    if (page === 0) {
      getData()
    } else {
      setPage(0)
    }
  }, [debValue])


  useEffect(() => {
    setFocused(false)
    dispatch(main_closeSearch())
  }, [router])

  useEffect(() => {
    if (ref?.current) {
      setDropdownWidth(ref?.current?.scrollWidth)
    }
  }, [ref])

  const goToKeywordPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13 && e.key === 'Enter') {
      if (value?.length >= 3) {
        Router.push(`/search/${value}`)
      }
    }
  }

  const goToKeywordPageClick = () => {
    if (value?.length >= 3) {
      Router.push(`/search/${value}`)
    }
  }

  useEffect(() => {
    if(list?.length > 0) {
      setDropdownOpen(true)
    }
    if(list?.length === 0) {
      setDropdownOpen(false)
    }
  }, [list])


  useEffect(() => {
    setDropdownOpen(false)
  }, [router])


  const onResetandClear = () => {
    setValue('')
    setPage(0)
    setList([])
  }

  useEffect(() => {
    setValue('')
  }, [router])

  return (
    
    <OutsideClickHandler onOutsideClick={(e) => {
      // setDropdownOpen(false)
      // onResetandClear()
      // dispatch(main_closeSearch())
      if(e?.target && 'classList' in e?.target) {
        const classList: any = e?.target?.classList
        if('length' in classList) {
          if(classList[classList?.length - 1] !== 'search-button') {
            setDropdownOpen(false)
            onResetandClear()
            dispatch(main_closeSearch())
          }
        }
      }
    }}>
      {
        dropdownOpen && (
          <Result 
            setPage={setPage} 
            width={dropdownWidth} 
            items={list}
            canLoadNext={canLoadNext}
            isEnd={isEnd}
            page={page}
            />
        )
      }
      <div 
        ref={ref} 
        className={getClassNames([styles.wrapper, focused && styles.focused])}
        >
        <div onClick={goToKeywordPageClick} className={styles.icon}>
          <BiSearch/>
        </div>
        <div className={styles.body}>
          <input
            onKeyDown={goToKeywordPage}
            onBlur={() => {
              setFocused(false)
            }}
            onFocus={() => setFocused(true)}
            onChange={e => setValue(e.target.value)}
            placeholder={"Search something"}
            value={value}
            type="text"/>
        </div>
        <div className={`${styles.close} ${styles.active}`}>
          {
            isLoading ? (
              <Button
                round={true}
                disabled={true}
                variant={'transparent'}
                style={{width: 40, height: 40}}
                icon={<LoadingOutlined rev={undefined} size={30}/>}
              />
            ) : (
              <Button
                style={{width: 40, height: 40}}
                onClick={() => {
                  onResetandClear()
                  setDropdownOpen(false)
                  dispatch(main_closeSearch())
                }}
                round
                variant={'transparent'}
                icon={<CgClose size={20}/>}
              />
            )
          }
        </div>
      </div>
    </OutsideClickHandler>
  )
}


export default Search;