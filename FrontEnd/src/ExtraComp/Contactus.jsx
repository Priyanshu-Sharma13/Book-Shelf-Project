import React from 'react'
import '../ExtraComp/Contactus.css'

const Contactus = () => {
  return (
    <div className="body">
        <div className="contai_ner">
            <div className="head_er">
            <h1>Customer Support Details</h1>
            <p>Please reach out to us on the below mentioned details.</p>
        </div>
        <div className="contact-info">
            <h2>Support Helpline</h2>
            <p>Number: 1860-258-3333</p>
            <p>Email Address: support@bookshelf.in</p>
        </div>
        <div className="contact-info">
            <h2>Safety Helpline</h2>
            <p>Number: 9999140999</p>
            <p>Email Address: safety@bookshelf.in</p>
        </div>
        <hr className="h_r"/>
        <div className="head_er">
            <p>Was this article helpful?</p>
        </div>
        <div className="button-group">
            <button>Yes</button>
            <button>No</button>
        </div>
        <hr className="h_r"/>
        <div className="support-hours">
            <h2>Support Helpline</h2>
            <p>Phone Support Hours: <br/>10:00 A.M to 7:00 P.M - All Days</p>
        </div>
        <hr className="h_r"/>
        <div className="support-hours">
            <h2>Safety Helpline</h2>
            <p>Phone Support Hours: <br/>10:00 A.M to 7:00 P.M - All Days</p>
        </div>
    </div>
</div>
  )
};

export default Contactus
