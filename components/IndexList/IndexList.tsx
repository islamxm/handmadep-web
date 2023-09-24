import styles from './IndexList.module.scss';

import { FC } from 'react'

const IndexList = ({list = []}: {list?: any[]}) => {
  return (
    <div className={styles.wrapper}>
      {
        list?.length > 0 && (
          list?.map((i) => (
            <div key={i?.id} className={styles.item}>{i?.title}</div>
          ))
        )
      }
    </div>
  )
}

export default IndexList;