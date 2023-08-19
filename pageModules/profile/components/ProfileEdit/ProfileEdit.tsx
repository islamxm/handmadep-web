import styles from './ProfileEdit.module.scss';
import IUser from '@/models/IUser';
import {FC} from 'react';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import Text from '@/components/Text/Text';
import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import Button from '@/components/Button/Button';
import { main_updateUserData } from '@/store/slices/mainSlice';
import notify from '@/helpers/notify';
import { useGetUserDataQuery } from '@/store/slices/apiSlice';

const service = new ApiService()

const ProfileEdit:FC<IUser> = ({
    username,
    email,
    about,
    site
}) => {
    const dispatch = useAppDispatch()
    const {token: {access}} = useAppSelector(s => s.main)
    const [load, setLoad] = useState(false)
    const [localUsername, setLocalUsername] = useState('')
    const [localEmail, setLocalEmail] = useState('')
    const [localAbout, setLocalAbout] = useState('')
    const [localSite, setLocalSite] = useState('')
    // const {refetch} = useGetUserDataQuery('')

    useEffect(() => {
        if(username) {
            setLocalUsername(username)
        }
        if(email) {
            setLocalEmail(email)
        }
        if(about) {
            setLocalAbout(about)
        }
        if(site) {
            setLocalSite(site)
        }
    }, [username, email, about, site])

    const onSubmit = () => {
        if(localEmail && localUsername && access) {
            setLoad(true)
            service.editSelf({
                username: localUsername,
                email: localEmail,
                about: localAbout,
                site: localSite,
                image: ''
            }, access).then(res => {
                if(res?.id) {
                    dispatch(main_updateUserData(res))
                    notify('Success', 'SUCCESS')
                } else {
                    if(typeof res === 'object') {
                        for(let key in res) {
                            notify(res[key]?.join(), 'ERROR')
                        }
                    }
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }
    

    return (
        <div className={`${styles.wrapper} panel`}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <Input
                        value={localUsername}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalUsername(e.target.value)}
                        placeholder='Username'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        value={localEmail}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLocalEmail(e.target.value)}
                        placeholder='E-mail'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        value={localSite}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLocalSite(e.target.value)}
                        placeholder='Your site'
                        />
                </Col>
                <Col span={24}>
                    <Text
                        maxLength={300}
                        value={localAbout}
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setLocalAbout(e.target.value)}
                        style={{height: 200}}
                        placeholder='About'
                        />
                </Col>
                {/* <Col span={24}>
                    <Input
                        placeholder='New password'
                        type='password'
                        />
                </Col>
                <Col span={24}>
                    <Input
                        placeholder='Confirm password'
                        type='password'
                        />
                </Col> */}
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            onClick={onSubmit}
                            load={load}
                            disabled={!(localEmail && localUsername)}
                            text='Save'
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )

}

export default ProfileEdit;