import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../store/globalStateProvider"; // global state
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { useTranslation } from 'next-i18next' // i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'  // i18n
import { useRouter } from 'next/router'; // i18n
import Link from 'next/link' // nextjs
import API from "../../api";

const useStyles = makeStyles((theme) => ({ // set styles through classes
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
    const { exampleDispatch, exampleState, authState } = useContext(GlobalContext);

    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation('landingPage');

    useEffect(() => {
        exampleDispatch({ type: "SET_DISPLAY_TEXT", payload: "Updated Value" }); // dispatcher for updating global state
    }, [])

    // useEffect(() => {
    //     API().get(`/PATHNAME`) // example .get
    //         .then((response) => {
    //             if (response.data) {
    //                 console.log("response.data: ", response.data);
    //             }
    //         }).catch((e) => {
    //             console.log("Error: ", e);
    //         });
    // }, [])

    return (
        <div className={classes.landingPageContainer}>
            <h1>
                {t('header')} {/* inserts translation for text with this key */}
            </h1>
            <p>
                {exampleState.displayText} {/* accessor for viewing global state variable */}
            </p>
            <p>

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
        ...await serverSideTranslations(locale, ['landingPage']), // page must wait for this translation file to load
    },
})