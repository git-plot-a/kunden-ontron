import Head from "next/head"
import constants from "@/app/constants/constants"

interface Props {
    metadata: {
        title: string,
        description: string,
        keywords: string,
        image: string
        [key: string]: string
    }
}

const HeaderMeta = ({ metadata }: Props) => {
    return (
        <>
            <Head>
                {metadata?.title ? (
                    <>
                        <title>{metadata?.title}</title>
                        <meta property="og:title" content={metadata?.title} />
                    </>
                ) : (
                    <>
                        <title>{constants.DEFAULT_META_TITLE}</title>
                        <meta property="og:title" content={constants.DEFAULT_META_TITLE} />
                    </>
                )}
                {metadata?.description ? (
                    <>
                        <meta name="description" content={metadata?.description} />
                        <meta property="og:description" content={metadata?.description} />
                    </>
                ) : (
                    <>
                        <meta name="description" content={constants.DEFAULT_META_DESCRIPTION} />
                        <meta property="og:description" content={constants.DEFAULT_META_DESCRIPTION} />
                    </>
                )}
                {metadata?.keywords ? (
                    <meta name="keywords" content={metadata?.keywords} />
                ) : (
                    <meta name="keywords" content={constants.DEFAULT_META_KEYWORDS} />
                )}
                {
                    metadata?.image ? (
                        <meta property="og:image" content={metadata?.image} />
                    ) : (
                        <meta property="og:image" content={constants.DEFAULT_META_IMAGE} />
                    )
                }
            </Head>
        </>
    )
}

export default HeaderMeta