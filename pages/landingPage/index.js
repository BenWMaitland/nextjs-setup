import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../../store/context"; // globalState
import { useTranslation } from 'next-i18next' // i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'  // i18n
import { useRouter } from 'next/router'; // i18n
import { Button } from '@material-ui/core';
import Link from 'next/link' // nextjs

const useStyles = makeStyles((theme) => ({
    landingPageContainer: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        backgroundColor: "blue",
        margin: 20,
    },
}));

export default function LandingPage() {
    const classes = useStyles();
    const { globalState, globalDispatch } = useContext(Context);

    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation('landingpage');

    useEffect(() => {
        globalDispatch({ type: "SET_DISPLAY_TEXT", payload: "Updated Value" });
    }, [])

    return (
        <div className={classes.landingPageContainer}>
            <h1>
                {t('header')} {/* inserts translation for text with this key */}
            </h1>
            <p>
                {globalState.displayText}
            </p>
            <Link
                href={{ pathname: router.pathname }}
                locale={router.locale = 'en'}>
                <Button
                    className={classes.button}>
                    EN
                </Button>
            </Link>

            <Link
                href={{ pathname: router.pathname }}
                locale={router.locale = 'fr'}>
                <Button
                    className={classes.button}>
                    FR
                </Button>
            </Link>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['landingpage']), // page must wait for this translation file to load
    },
})