import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image from 'next/image'

const description =
    'Chat Bridge simplifies the integration of Facebook Messenger webhook handling into your Node.js applications.'

const logo = (
    <div>
        <Image src="/favicon.ico" alt="Chat Bridge" width={25} height={25} />
        <span>Chat Bridge</span>
        <style jsx>{`
            div {
                display: flex;
                align-items: center;
            }
            span {
                margin-left: 0.5rem;
                font-weight: 600;
                font-size: 1.25rem;
            }
        `}</style>
    </div>
)

const config = {
    useNextSeoProps() {
        const { asPath } = useRouter()
        if (asPath !== '/') {
            return {
                titleTemplate: '%s — Chat Bridge',
            }
        }
    },
    head: function useHead() {
        const { title } = useConfig()

        const socialCard =
            'https://cdn.discordapp.com/attachments/1157951067284312114/1194558135948562443/chat-bridge-more-clean.png'

        return (
            <>
                <meta name="msapplication-TileColor" content="#fff" />
                <meta name="theme-color" content="#fff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="description" content={description} />
                <meta name="og:description" content={description} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={socialCard} />
                <meta name="twitter:site:domain" content="nextra.site" />
                <meta name="twitter:url" content="https://nextra.site" />
                <meta name="og:title" content={title ? `${title} — Chat Bridge` : 'Chat Bridge'} />
                <meta name="og:image" content={socialCard} />
                <meta name="apple-mobile-web-app-title" content="Chat Bridge" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </>
        )
    },
    logo,
    project: {
        link: 'https://github.com/BadEnd777/Chat-Bridge',
    },
    docsRepositoryBase: 'https://github.com/BadEnd777/Chat-Bridge/tree/main/docs',
    footer: {
        text: <span>© {new Date().getFullYear()} Onyx Innovators, Inc. All rights reserved.</span>,
    },
    toc: {
        backToTop: true,
    },
}

export default config
