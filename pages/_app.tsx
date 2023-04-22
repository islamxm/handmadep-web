import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import '../styles/style.scss';

import type { AppProps } from 'next/app';
import PageLayout from '@/components/PageLayout/PageLayout';
import { Provider } from 'react-redux';
import store from '@/store/store';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import MainWrapper from '@/components/MainWrapper/MainWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainWrapper>
      <GoogleOAuthProvider clientId='6757538311-qdea2pctjq0jj7qqb7ql43bqfuqvg0mj.apps.googleusercontent.com'>
          <ToastContainer limit={3}/>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </GoogleOAuthProvider>
      </MainWrapper>
        
         
    </Provider>
   
  )
}
