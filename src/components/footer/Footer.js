import React from 'react'
import './footer.css'
function Footer() {
    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '40px', color: '#fff' }}
        >
            <div>
                <span>
                    <a href='https://google.com'>Privacy Policy</a>
                </span>
                <span>
                    {' '}
                    | © 2023 HighRadius Corporation. All Rights Reserved.
                </span>
            </div>
        </div>
    )
}

export default Footer
