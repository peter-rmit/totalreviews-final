import React from 'react'
import { Helmet } from 'react-helmet';


function ThankyouPage() {
    return (
        <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center text-center">
            {/*SEO Support*/}
            <Helmet>
                <title>Thankyou | Total Reviews</title>

            </Helmet>
            {/*SEO Support End */}
            <h1>We have recieved your review! <br /> Thank you! </h1>
        </div>
    )

}

export default ThankyouPage;