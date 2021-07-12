import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../../store/context"; // globalState

import { useTranslation } from 'next-i18next' // i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'  // i18n
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    landingPageContainer: {
        backgroundColor: theme.palette.primary.main,
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
            <h1>{t('header')}</h1>
            <p>
                {globalState.displayText}
            </p>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['landingpage']),
    },
})