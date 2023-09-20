import styles from './Main.module.scss';
import { FC, useState } from 'react'
import { Row, Col } from 'antd';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';
import Link from 'next/link';
const Main:FC<any> = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [load, setLoad] = useState(false)

  return (
    <div className={styles.wrapper}>
      <p>
      If you have questions, comments, or suggestions on how to improve the HandmadeP experience, we would love to hear it! <Link href={'/contacts'}>
        Contact Us
      </Link>
      </p>
    </div>
  )
}

export default Main;