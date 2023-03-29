import '../styles/style.scss';
import type { AppProps } from 'next/app';
import PageLayout from '@/components/PageLayout/PageLayout';
import { Provider } from 'react-redux';
import store from '@/store/store';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
         <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
    </Provider>
   
  )
}
