import Button from '@/components/Button/Button';
import styles from './Main.module.scss';
import {Row, Col} from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react'


const Main:FC<any> = () => {
  const {query} = useRouter()
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    
    if(query?.url && typeof query?.url === 'string' && query?.shop && typeof query?.shop === 'string') {
      setLink(query?.url)
      setName(query?.shop)
    }
  }, [query])

  return (
    <div className={styles.wrapper}>
      <Row gutter={[20,20]}>
        <Col span={24}>
          <h2 className={styles.title}>You leave HandMadeP</h2>
        </Col>
        <Col span={24}>
          <div className={styles.text}>
          You opened a link on handmadep.com that redirects to <span>{link}</span>
          </div>
        </Col>
        {
          link && (
            <Col span={24}>
              <Button
                link={link}
                text={'Open the link'}
                />
            </Col>
          )
        }
        
      </Row>
    </div>
  )
}

export default Main;