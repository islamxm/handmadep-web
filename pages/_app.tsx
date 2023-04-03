import 'swiper/css';
import '../styles/style.scss';
import type { AppProps } from 'next/app';
import PageLayout from '@/components/PageLayout/PageLayout';
import { Provider } from 'react-redux';
import store from '@/store/store';
import {GoogleOAuthProvider} from '@react-oauth/google';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <GoogleOAuthProvider clientId='6757538311-qdea2pctjq0jj7qqb7ql43bqfuqvg0mj.apps.googleusercontent.com'>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </GoogleOAuthProvider>
         
    </Provider>
   
  )
}
