import { Box, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BadReviewModal, GoodReviewModal } from '../../../../_metronic/Modals';
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { validateToken } from '../../../utils/tokenValidation';
import { checkReviewed } from "../_redux/authCrud";


function RatingPage(props) {
    const [id, setId] = useState(null);
    const [tokenn, setToken] = useState({});
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = useState(true);
    const [showBad, setOnShowBadModal] = useState(false);
    const [showGood, setOnShowGoodModal] = useState(false);
    const [errMsg, setErrMsg] = useState(null);


    useEffect(() => {
        const { token } = props.match.params;
        let validatedToken = validateToken(token)
        setToken(validatedToken);
        if (validatedToken) {
            checkReviewed({ id: validatedToken.id })
                .then(({ data: { status, message } }) => {
                    setLoading(false);
                    if (status === 400) {
                        setErrMsg(message);
                    }
                    setId(validatedToken.id);
                })
                .catch(error => {
                    console.log("Api Failed >>", error.message);
                })
        } else {
            setLoading(false);
            setErrMsg('ERROR 404! PAGE NOT FOUND')
        }

    }, [id])

    const openModal = () => {
        if (value > 3) {
            setOnShowGoodModal(true);
        }
        else if (value >= 1 && value <= 3) {
            setOnShowBadModal(true);
        }
    }


    return (
        <Container size={'xs'} className="d-flex flex-column m-auto align-items-center">
            {/*SEO Support*/}
            <Helmet>
                <title>Rating | Total Reviews</title>

            </Helmet>
            {/*SEO Support End */}
            {loading ?
                ''
                :
                <div className="d-flex flex-column m-auto align-items-center">
                    {
                        errMsg ?
                            <h2>{errMsg}</h2>
                            :
                            <>
                                <Link to="#" className="login-logo py-6 mb-4">
                                    <img
                                        src={`${toAbsoluteUrl('/media/logos/tr-logo.png')}`}
                                        className="max-h-100px"
                                        alt="brand-logo"
                                    />
                                </Link>
                                <h1 className="h3 mb-5 text-center">
                                    Rate our Total Reviews Business Application!
                                </h1>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Rating
                                        style={{ fontSize: '52px' }}
                                        name="size-large"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />

                                </Box>
                                <Button
                                    onClick={openModal}
                                    className="btn btn-primary p-3 w-15">
                                    Submit
                                </Button>

                                <BadReviewModal show={showBad}
                                    props={props}
                                    rating={value}
                                    data={tokenn}
                                    onHide={setOnShowBadModal}
                                />
                                <GoodReviewModal show={showGood}
                                    props={props}
                                    rating={value}
                                    data={tokenn}
                                    onHide={setOnShowGoodModal}
                                />
                            </>
                    }

                </div>}


        </Container>

    )

}
export default RatingPage;