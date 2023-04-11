import List from "@/components/List/List";
// import prodsMock from "@/mock/prodsMock";
import ContentLayout from "@/components/ContentLayout/ContentLayout";
import ApiService from "@/service/apiService";
import {useEffect, useState, useRef, useCallback} from 'react';
import { useScroll } from '@react-hooks-library/core'
import styles from '@/pageModules/home/home.module.scss';

const service = new ApiService()



export const getServerSideProps = async () => {
    const res = await service.getCardsList(1)
    const data = await res?.results

    return {
        props: {list: data}
    }
}


const HomePage = ({list}: {list: any[]}) => { 
  const [scrollY, setScrollY] = useState(0)
  const [height, setHeight] = useState(0)
  const box = useRef<HTMLDivElement | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [canLoad, setCanLoad] = useState(true)
  const [localList, setLocalList] = useState<any[]>([])


  


  useEffect(() => {
    if(list) {
      setLocalList(list)

      if(box?.current) {
        setHeight(box?.current?.scrollHeight)
      }
    }
  }, [list, box])



  // useScroll(box, ({ scrollY }) => {
  //   // setScrollY(scrollY * 100)
  //   let currentPos = scrollY * 100

  //   if(currentPos >= 95) {
  //     setCurrentPage(s => s + 1)
  //   }
  // })  



  const updateList = useCallback(() => {
    if(currentPage > 1) {
      service.getCardsList(currentPage).then(res => {
        console.log(res?.results)
        if(res?.results?.length > 0) {
          setLocalList(s => [...s, ...res?.results])
        }
      })
    }
  }, [currentPage])

  useEffect(() => {
    updateList()
  }, [currentPage])



  return (
    <div ref={box} className={styles.wrapper}>
      <ContentLayout>
        <List setCurrentPage={setCurrentPage} list={localList}/>
      </ContentLayout>
    </div>
    
  )
}

export default HomePage;