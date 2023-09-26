import styles from './IndexList.module.scss';

import { FC } from 'react'

const IndexList = ({list = []}: {list?: any[]}) => {
  return (
    <div className={styles.wrapper}>
      {
        list?.length > 0 && (
          list?.map((i) => (
            <article key={i?.id} className={styles.item}>
              <div className={styles.img}>
                <img src={i?.cover_url} alt={i?.title} />
              </div>
              <div className={styles.name}>{i?.title}</div>
            </article>
          ))
        )
      }
    </div>
  )
}

export default IndexList;