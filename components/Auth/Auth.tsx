import styles from './Auth.module.scss';
import { Row, Col, Modal, ModalFuncProps } from 'antd';
import { FC, useState, useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import google from '@/public/assets/auth-google.png';
import { HiOutlineMail } from 'react-icons/hi';
import notify from '@/helpers/notify';
import { useAuthMutation } from '@/store/slices/apiSlice';
import { main_updateLoading, main_updateResetPassPopup, main_updateToken } from '@/store/slices/mainSlice';
import ResetPasswordModal from '@/popups/ResetPasswordModal/ResetPasswordModa';
import { authorizeFunc, deauthorizeFunc } from '@/helpers/authorizeUtils';
import apiSlice from '@/store/slices/apiSlice';
import Link from 'next/link';

interface I extends ModalFuncProps {
	toggleModal: (...args: any[]) => any
}

const Auth: FC<I> = (props) => {
	const { onCancel, toggleModal } = props
	const [authResponse, authResponseResult] = useAuthMutation()
	const { resetPassPopup } = useAppSelector(s => s.main)
	const [authWithEmail, setAuthWithEmail] = useState(false)
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const onClose = () => {
		if (onCancel) {
			setEmail('')
			setPassword('')
			onCancel()
			authResponseResult.isError = false
		}
	}

	const onAuth = () => {
		if (email && password) authResponse({ password, email })
	}

	useEffect(() => {
		if (authResponseResult?.data && authResponseResult?.isSuccess) {
			const tokens = authResponseResult?.data
			notify('Welcome!', 'SUCCESS')
			authorizeFunc(tokens)
			dispatch(main_updateToken({
				access: tokens?.access,
				refresh: tokens?.refresh
			}))
		}
		if (authResponseResult?.isError) {
			deauthorizeFunc()
			notify('Wrong credentials', 'ERROR')
		}
		dispatch(main_updateLoading(false))
	}, [authResponseResult])

	const authGoogle = async () => {
		const res = await dispatch(apiSlice.endpoints.authGoogle.initiate(''))
		const { data, isSuccess, isLoading } = res
		dispatch(main_updateLoading(isLoading))
		if (data?.authorization_url && isSuccess) window.location.replace(data?.authorization_url)
	}

	return (
		<Modal
			{...props}
			onCancel={onClose}
			width={500}
			centered
			className={`${styles.wrapper} modal`}
		>
			<ResetPasswordModal
				open={resetPassPopup}
				onCancel={() => dispatch(main_updateResetPassPopup(false))}
			/>
			<div className='modal-head page-title'>
				Log in
			</div>
			<Col span={24}>
				<Row gutter={[10, 10]}>
					{
						authWithEmail && (
							<>
								<Col span={24}>
									<Input
										error={authResponseResult.isError}
										placeholder='E-mail'
										value={email}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
									/>
								</Col>
								<Col span={24}>
									<Input
										error={authResponseResult.isError}
										placeholder='Password'
										value={password}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
										type={'password'}
									/>
								</Col>
								<Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>
									<Button
										text={'Log in'}
										load={authResponseResult?.isLoading}
										disabled={email && password ? false : true}
										onClick={onAuth}
									/>
								</Col>
								<Col span={24}>
									<div className={styles.ex}>
										Forgot password?
										<span
											onClick={() => {
												dispatch(main_updateResetPassPopup(true))
											}}
										> Reset password</span>
									</div>
								</Col>
								<Col span={24}>
									<div className={styles.ex}>
										Don&apos;t have account?
										<span
											onClick={() => {
												onClose()
												toggleModal()
											}}
										> Sign up</span>
									</div>
								</Col>
							</>
						)
					}
					<Col span={24}>
						<div className={styles.itgr}>
							{
								!authWithEmail ? (
									<button
										onClick={() => setAuthWithEmail(true)}
										className={styles.item}>
										<div className={styles.icon}><HiOutlineMail /></div>
										<div className={styles.label}>Continue with e-mail</div>
									</button>
								) : null
							}
							<button
								onClick={() => {
									if (authWithEmail) {
										setAuthWithEmail(false)
									} else {
										authGoogle()
									}
								}}
								className={styles.item}>
								<div className={styles.icon}><Image src={google} alt="" /></div>
								<div className={styles.label}>Continue with Google</div>
							</button>
						</div>
					</Col>
					<Col span={24}>
						<div className={styles.terms}>
						If you choose to continue, you agree to the <Link href={'/terms'}>Terms of Useset</Link> established by HandMadeP. Read our <a href="#">Privacy Policy</a>.
						</div>
					</Col>
				</Row>
			</Col>
		</Modal>
	)
}

export default Auth;


