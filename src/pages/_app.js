import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Box from '@mui/material/Box'

import theme from '../config/theme'
import createEmotionCache from '../utils/createEmotionCache'
import { AuthProvider } from '../modules/auth/useAuth'
import analytics from '../services/analytics'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const font = Space_Mono({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp(props) {
  const router = useRouter()
  
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: {
      session = null,
      ...pageProps
    },
  } = props

  useEffect(() => {
    const handleRouteChange = url => {
      analytics.page({
        url,
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      
      <style jsx global>{`
        :root {
          --font-sans: ${font?.style?.fontFamily};
        }
      `}</style>
      
      <SessionProvider session={session}>
        <AuthProvider>
          <ThemeProvider theme={theme({
            font: font.style
          })}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <QueryClientProvider client={new QueryClient()}>
              <Box
                sx={{
                  minHeight: '100vh',
                  paddingBottom: '4rem',
                  backgroundColor: 'background.default',
                  color: 'text.primary'
                }}
              >
                <Component {...pageProps} />
              </Box>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </SessionProvider>
    </CacheProvider>
  )
}
