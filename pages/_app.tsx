import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import '../styles/style.scss';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import PageLayout from '@/components/PageLayout/PageLayout';
import { Provider } from 'react-redux';
import store from '@/store/store';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Script from 'next/script';


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Script id='gtm-1' strategy={'afterInteractive'} async src="https://www.googletagmanager.com/gtag/js?id=G-1KET5VSY85"></Script>
      <Script
        async
        strategy={'afterInteractive'}
        id='gtm-2'
        >
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1KET5VSY85');
          `
        }
      </Script>
      
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
