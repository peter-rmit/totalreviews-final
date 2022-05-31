import React from 'react';
import FacebookLogin from 'react-facebook-login';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export const Step1 = ({ formik, getInputClassNamees, currentStep }) => (
  <div
    className="pb-5"
    data-wizard-type="step-content"
    data-wizard-state={currentStep === 1 ? 'current' : '0'}>
    <div className="pb-10 pb-lg-15">
      <h3 className="font-weight-bolder text-dark display5">Create Account</h3>
      <div className="text-muted font-weight-bold font-size-h4">
        Already have an Account ?{' '}
        <Link
          to="/auth/login"
          className="text-primary font-weight-bolder">
          Sign In
        </Link>
      </div>
    </div>
    <div className="form-group">
      <label className="font-size-h6 font-weight-bolder text-dark">
        Company Name
      </label>
      <input
        placeholder="Company"
        type="text"
        className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
          'companyName'
        )}`}
        name="companyName"
        {...formik.getFieldProps('companyName')}
      />
      {formik.touched.companyName && formik.errors.companyName ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block error-color">{formik.errors.companyName}</div>
        </div>
      ) : null}
    </div>
    <div className="form-group">
      <label className="font-size-h6 font-weight-bolder text-dark">Name</label>
      <input
        placeholder="john doe"
        type="text"
        className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
          'name'
        )}`}
        name="name"
        {...formik.getFieldProps('name')}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block error-color">{formik.errors.name}</div>
        </div>
      ) : null}
    </div>
    <div className="form-group">
      <label className="font-size-h6 font-weight-bolder text-dark">Phone</label>
      <input
        placeholder="+1 xxx xxxx"
        type="phone"
        className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
          'phone'
        )}`}
        name="phone"
        {...formik.getFieldProps('phone')}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block error-color" >{formik.errors.phone}</div>
        </div>
      ) : null}
    </div>
    <div className="form-group fv-plugins-icon-container">
      <label className="font-size-h6 font-weight-bolder text-dark">Email</label>
      <input
        placeholder="123@abc.com"
        type="email"
        className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
          'facebookEmail'
        )}`}
        name="facebookEmail"
        {...formik.getFieldProps('facebookEmail')}
      />
      {formik.touched.facebookEmail && formik.errors.facebookEmail ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block error-color">{formik.errors.facebookEmail}</div>
        </div>
      ) : null}
    </div>
    <div className="form-group fv-plugins-icon-container">
      <label className="font-size-h6 font-weight-bolder text-dark">Password</label>
      <input
        placeholder="password"
        type="password"
        className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
          'password'
        )}`}
        name="password"
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block error-color">{formik.errors.password}</div>
        </div>
      ) : null}
    </div>
  </div>
);

export const Step2 = ({ formik, getInputClassNamees, currentStep }) => (
  <div
    className="pb-5"
    data-wizard-type="step-content"
    data-wizard-state={currentStep === 2 ? 'current' : '0'}>
    <div className="pt-lg-0 pt-5 pb-15">
      <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
        Address Details
      </h3>
      {/* <div className="text-muted font-weight-bold font-size-h4">
        Have a Different Address ?
        <a href="#" className="text-primary font-weight-bolder">
          Add Address
        </a>
      </div> */}
    </div>
    <div className="row">
      <div className="col-xl-12">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            Address
          </label>
          <textarea
            type="text"
            name="address"
            placeholder="Address here..."
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'address'
            )}`}
            {...formik.getFieldProps('address')}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block error-color" >{formik.errors.address}</div>
            </div>
          ) : null}
        </div>
      </div>
      {/* <div className="col-xl-6">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLane2"
            placeholder="Address Line 1"
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'addressLane2'
            )}`}
            {...formik.getFieldProps('addressLane2')}
          />
          {formik.touched.addressLane2 && formik.errors.addressLane2 ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.addressLane2}</div>
            </div>
          ) : null}
        </div>
      </div> */}
    </div>
    <div className="row">
      <div className="col-xl-6">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            placeholder="3000"
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'postcode'
            )}`}
            {...formik.getFieldProps('postcode')}
          />
          {formik.touched.postcode && formik.errors.postcode ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block error-color">{formik.errors.postcode}</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="col-xl-6">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="my city"
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'city'
            )}`}
            {...formik.getFieldProps('city')}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block error-color">{formik.errors.city}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-6">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            State
          </label>
          <input
            type="text"
            name="state"
            placeholder="NY"
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'state'
            )}`}
            {...formik.getFieldProps('state')}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block error-color">{formik.errors.state}</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="col-xl-6">
        <div className="form-group">
          <label className="font-size-h6 font-weight-bolder text-dark">
            Country
          </label>
          <select
            id="country"
            name="country"
            className={`form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6 ${getInputClassNamees(
              'country'
            )}`}
            value={formik.values.country}
            onChange={formik.handleChange}
            className="form-control h-auto py-7 px-6 border-0 rounded-lg font-size-h6">
            <option value=''>Select</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">Åland Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">
              Macedonia, the former Yugoslav Republic of
            </option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory, Occupied</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">Réunion</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barthélemy</option>
            <option value="SH">
              Saint Helena, Ascension and Tristan da Cunha
            </option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SX">Sint Maarten (Dutch part)</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">
              South Georgia and the South Sandwich Islands
            </option>
            <option value="SS">South Sudan</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </select>
          {formik.touched.country && formik.errors.country ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block error-color">{formik.errors.country}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

export const Step3 = ({ handleResponse, handleClick, currentStep, facebookToken }) => (
  <div
    className="pb-5"
    data-wizard-type="step-content"
    data-wizard-state={currentStep === 3 ? 'current' : '0'}>
    <div className="pt-lg-0 pt-5 pb-15">
      <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
        Social Authentication
      </h3>
      <div className="text-muted font-weight-bold font-size-h4">
        Get Your Facebook Credentials now!
      </div>
    </div>
    <div className="text-dark-50 font-weight-bold line-height-lg mb-8">
      <div>
        {
          _.isEmpty(facebookToken) !== true ?
            <h1 className="h5">Successfully Logged In</h1>
            :
            <FacebookLogin
              appId="314808506872080"
              autoLoad={false}
              fields="name,email,picture"
              scope="email, pages_show_list, pages_read_user_content"
              onClick={handleClick}
              callback={handleResponse} />
        }
      </div>
    </div>
  </div>
);

export const Step4 = ({ formik, getInputClassNamees, currentStep }) => (
  <div
    className="pb-5"
    data-wizard-type="step-content"
    data-wizard-state={currentStep === 4 ? 'current' : '0'}>
    <div className="pt-lg-0 pt-5 pb-15">
      <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
        Complete
      </h3>
      <div className="text-muted font-weight-bold font-size-h4">
        Complete Your Signup And Become A Member!
      </div>
    </div>
    <h4 className="font-weight-bolder mb-3">Personal Details:</h4>
    <div className="text-dark-50 font-weight-bold line-height-lg mb-8">
      <div>{formik.values.name}</div>
      <div>{formik.values.companyName}</div>
      <div>{formik.values.phone}</div>
    </div>
    <h4 className="font-weight-bolder mb-3">Address Details:</h4>
    <div className="text-dark-50 font-weight-bold line-height-lg mb-8">
      <div>{formik.values.address}</div>
      {/* <div>{formik.values.address2}</div> */}
      <div>
        {formik.values.city} {formik.values.zipcode}, {formik.values.state},{' '}
        {formik.values.country}
      </div>
    </div>
    <h4 className="font-weight-bolder mb-3">Connect Your Channels:</h4>
    <div className="text-dark-50 font-weight-bold line-height-lg mb-8">
      <div>Facebook Login <i className="fas fa-check"></i></div>
      <div>{formik.values.facebookEmail}</div>
      <div>{new Array(formik.values.password.length).join("*")}</div>
    </div>
  </div>
);

export const FormHeaders = ({ currentStep }) => (
  <div className="wizard-steps">
    <div
      className="wizard-step"
      data-wizard-type="step"
      data-wizard-state={
        currentStep === 1 ? 'current' : currentStep > 1 ? 'done' : 'none'
      }>
      <div className="wizard-wrapper">
        <div className="wizard-icon">
          <i className="wizard-check ki ki-check"></i>
          <span className="wizard-number">1</span>
        </div>
        <div className="wizard-label">
          <h3 className="wizard-title">Account Settings</h3>
          <div className="wizard-desc">Setup Your Account Details</div>
        </div>
      </div>
    </div>
    <div
      className="wizard-step"
      data-wizard-type="step"
      data-wizard-state={
        currentStep === 2 ? 'current' : currentStep > 2 ? 'done' : 'none'
      }>
      <div className="wizard-wrapper">
        <div className="wizard-icon">
          <i className="wizard-check ki ki-check"></i>
          <span className="wizard-number">2</span>
        </div>
        <div className="wizard-label">
          <h3 className="wizard-title">Address Details</h3>
          <div className="wizard-desc">Setup Residence Address</div>
        </div>
      </div>
    </div>
    <div
      className="wizard-step"
      data-wizard-type="step"
      data-wizard-state={
        currentStep === 3 ? 'current' : currentStep > 3 ? 'done' : 'none'
      }>
      <div className="wizard-wrapper">
        <div className="wizard-icon">
          <i className="wizard-check ki ki-check"></i>
          <span className="wizard-number">3</span>
        </div>
        <div className="wizard-label">
          <h3 className="wizard-title">Connect Your Channels</h3>
          <div className="wizard-desc">Setup Facebook Credentials</div>
        </div>
      </div>
    </div>
    <div
      className="wizard-step"
      data-wizard-type="step"
      data-wizard-state={
        currentStep === 4 ? 'current' : currentStep > 4 ? 'done' : 'none'
      }>
      <div className="wizard-wrapper">
        <div className="wizard-icon">
          <i className="wizard-check ki ki-check"></i>
          <span className="wizard-number">4</span>
        </div>
        <div className="wizard-label">
          <h3 className="wizard-title">Completed!</h3>
          <div className="wizard-desc">Review and Submit</div>
        </div>
      </div>
    </div>
  </div>
);
