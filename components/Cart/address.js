import React, { Component } from 'react'
import { AppContext } from '../Context/AppContext'

import { withTranslation } from '../../i18n'
import dataNationality from '../../data-clean/nationality.json'
import dataProvinces from '../../data-clean/provinces.json'
import dataDistrict from '../../data-clean/districts.json'
import dataZipcode from '../../data-clean/zipcodes.json'
class Address extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            nextstep: false,
            Provinces: '',
            Districts: '',
            dataDistrict: '',
            Address: '',
            ZipCode: '',
            dataZipCode: '',
            address: {
                F_name: '',
                L_name: '',
                Phone: '',
                Email: '',
                Street: '',
                State: 'ไทย',
                Town: '',
                Province: '',
                Postcode: '',
            },
            billing: {
                BF_name: '',
                BL_name: '',
                BPhone: '',
                BEmail: '',
                BStreet: '',
                BState: 'ไทย',
                BTown: '',
                BProvince: '',
                BPostcode: '',
            },
            error: {
                F_name: '',
                L_name: '',
                Phone: '',
                Email: '',
                Street: '',
                State: '',
                Town: '',
                Province: '',
                Postcode: '',
            },
            errorBilling: {
                BF_name: '',
                BL_name: '',
                BPhone: '',
                BEmail: '',
                BStreet: '',
                BState: '',
                BTown: '',
                BProvince: '',
                BPostcode: '',
            },
        }
    }
    callsection = () => {
        this.setState({ checked: !this.state.checked });
    }
    callNextstep = () => {
        this.setState({ nextstep: !this.state.nextstep });
    }
    componentDidMount = () => {
        const [cart, setCart, address, setAddress, billing, setBilling] = this.context
        const addressDetail = (null !== address && Object.keys(address).length) ? address : ''
        const billingDetail = (null !== billing && Object.keys(billing).length) ? billing : ''
        if (billingDetail.BEmail != null) {
            this.setState({ checked: false })
        } else {
            this.setState({ checked: true })
        }
        this.setState({
            address: {
                ...this.state.address,
                F_name: addressDetail.F_name,
                L_name: addressDetail.L_name,
                Phone: addressDetail.Phone,
                Email: addressDetail.Email,
                Street: addressDetail.Street,
                // State: addressDetail.State,
                State: 'ไทย',
                Town: addressDetail.Town,
                Province: addressDetail.Province,
                Postcode: addressDetail.Postcode,
            },
            billing: {
                ...this.state.billing,
                BF_name: billingDetail.BF_name,
                BL_name: billingDetail.BL_name,
                BPhone: billingDetail.BPhone,
                BEmail: billingDetail.BEmail,
                BStreet: billingDetail.BStreet,
                // BState: billingDetail.BState,
                BState: 'ไทย',
                BTown: billingDetail.BTown,
                BProvince: billingDetail.BProvince,
                BPostcode: billingDetail.BPostcode,
            },

        })

    }
    handleChangeProvince = (event, funcation) => {
        const { name, value } = event.target
        if (this.state.Nationality != "") {
            this.ProvinceChange(value)
        }
        funcation(event)
        this.setState({
            Provinces: value,
            ZipCode: '',
            dataDistrict: '',
            dataZipCode: '',
            Districts: ''
        })
        this.setState({ [name]: value, error: { ...this.state.error, [name]: '' } })

    }
    handleChangeDistricts = (event, funcation) => {
        const { name, value } = event.target
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index]
        var option = optionElement.getAttribute('data-tag');
        this.setState({
            Districts: value
        })
        funcation(event)
        this.ZipcodeChange(option)
    }
    ProvinceChange = async (e) => {
        const PID = await dataProvinces.filter((p) => {
            return p.PROVINCE_NAME === e
        })
        if (PID !== null && PID.length !== 0) {
            this.DistrictChange(PID[0].PROVINCE_ID)
        }
    }
    DistrictChange = async (PID) => {
        const dataDist = await dataDistrict.filter((d) => {
            return d.PROVINCE_ID === PID
        })
        // usage example:

        this.setState({
            dataDistrict: dataDist
        })
    }
    ZipcodeChange = async (DID) => {
        const dataDist = await dataZipcode.filter((z) => {
            return z.DISTRICT_ID === DID
        })
        const uniqueTags = [];
        dataDist.map(img => {
            if (uniqueTags.indexOf(img.ZIPCODE) === -1) {
                uniqueTags.push(img.ZIPCODE)
            }
        });
        this.setState({
            dataZipCode: uniqueTags
        })
    }
    bindsection = () => {
        const [cart, setCart, address, setAddress] = this.context
        const addressDetail = (null !== address && Object.keys(address).length) ? address : ''
        if (this.state.checked == false) {
            return (
                <div className="formBilling-container">
                    <div className="subText">
                        <p>Ship to a different address ?</p>
                    </div>
                    <div className="formBilling-inner">
                        <div className="halfCol-input">
                            <label className="label-title" for="BF_name">First Name<span>*</span></label>
                            <input className="inputCart" type="text" name="BF_name" id="BF_name" value={this.state.billing.BF_name} onChange={this.handleBillingChange} />
                            <p className='text-danger'>{this.state.errorBilling.BF_name}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BL_name">Last Name<span>*</span></label>
                            <input className="inputCart" type="text" name="BL_name" id="BL_name" onChange={this.handleBillingChange} value={this.state.billing.BL_name} />
                            <p className='text-danger'>{this.state.errorBilling.BL_name}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BPhone">Phone Number<span>*</span></label>
                            <input className="inputCart" type="text" name="BPhone" id="BPhone" onChange={this.handleBillingChange} value={this.state.billing.BPhone} />
                            <p className='text-danger'>{this.state.errorBilling.BPhone}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BEmail">E-mail<span>*</span></label>
                            <input className="inputCart" type="email" name="BEmail" id="BEmail" onChange={this.handleBillingChange} value={this.state.billing.BEmail} />
                            <p className='text-danger'>{this.state.errorBilling.BEmail}</p>
                        </div>
                        <div className="fullCol-input mt-4">
                            <label className="label-title" for="BStreet">Street Address<span>*</span></label>
                            <input className="inputCart" type="text" name="BStreet" id="BStreet" onChange={this.handleBillingChange} value={this.state.billing.BStreet} />
                            <p className='text-danger'>{this.state.errorBilling.BStreet}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BState">State / Country<span>*</span></label>
                            <input className="inputCart" type="text" name="BState" id="BState" value="ไทย" readOnly disabled />
                            {/* <select id="inputState" className="selectCart" name="BState" onChange={this.handleBillingChange}  value={this.state.billing.BState}>
                                {
                                    dataNationality.map((items, i) => {
                                        if (this.props.Nationality === items.nationality) {
                                            return <option key={i} defaultValue={items.nationality}>{items.nationality}</option>
                                        }
                                        else if (this.props.Nationality == "" && i == 0) {
                                            return <option key={i} defaultValue={''}>- Select Nationality -</option>
                                        }
                                        else {
                                            return <option key={i} value={items.nationality} >{items.nationality}</option>
                                        }
                                    })
                                }
                            </select> */}
                            <p className='text-danger'>{this.state.errorBilling.BState}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BProvince">Province<span>*</span></label>
                            <select id="inputState" className="selectCart" name="BProvince" onChange={(e) => this.handleChangeProvince(e, this.handleBillingChange)} value={this.state.billing.BProvince}>
                                <option key={i}>-</option>
                                {
                                    dataProvinces.map((items, i) => {

                                        return <option key={i} checked={this.state.address.Province == items.PROVINCE_NAME} >{items.PROVINCE_NAME}</option>
                                    })
                                }
                            </select>
                            <p className='text-danger'>{this.state.errorBilling.BProvince}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BTown">Town / City<span>*</span></label>
                            <select id="inputState" className="selectCart" name="BTown" onChange={(e) => this.handleChangeDistricts(e, this.handleBillingChange)} value={this.state.billing.BTown}>
                                <option value="-">-</option>
                                {
                                    this.state.dataDistrict !== '' ? this.state.dataDistrict.map((items, i) => {
                                        return <option key={i} data-tag={items.DISTRICT_ID} onChange={this.props.handleOption} >{items.DISTRICT_NAME}</option>
                                    }) : <option value={this.state.billing.BTown}>{this.state.billing.BTown}</option>
                                }
                            </select>
                            <p className='text-danger'>{this.state.errorBilling.BTown}</p>
                        </div>
                        <div className="halfCol-input">
                            <label className="label-title" for="BPostcode">Postcode<span>*</span></label>
                            <input className="inputCart" type="text" name="BPostcode" id="BPostcode" value={this.state.billing.BPostcode} onChange={this.handleBillingChange} />

                            <p className='text-danger'>{this.state.errorBilling.BPostcode}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return false
        }
    }
    handleChange = async (e) => {
        const { name, value } = e.target
        await this.setState({
            address: { ...this.state.address, [name]: value },
            error: { ...this.state.error, [name]: '' }
        })
    }
    handleBillingChange = async (e) => {
        const { name, value } = e.target
        console.log(value)
        await this.setState({
            billing: { ...this.state.billing, [name]: value },
            errorBilling: { ...this.state.errorBilling, [name]: '' }
        })
    }
    confirmAdress = (e) => {
        localStorage.setItem('address', JSON.stringify(this.state.address))
        localStorage.setItem('billing', JSON.stringify(this.state.billing))
        const [cart, setCart, address, setAddress, billing, setBilling] = this.context
        // const addressDetail = (null !== address && Object.keys(address).length) ? address : ''
        // const billingDetail = (null !== billing && Object.keys(billing).length) ? billing : ''
        this.props.callsection(e)
        setAddress(this.state.address)
        setBilling(this.state.billing)

    }
    validate = async (e) => {
        // ------F_name--
        if (this.state.address.F_name == undefined || this.state.address.F_name == '') {

            await this.setState({ error: { ...this.state.error, F_name: 'The F_name field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, F_name: '' } })
        }
        if (this.state.address.L_name == undefined || this.state.address.L_name == '') {
            await this.setState({ error: { ...this.state.error, L_name: 'The L_name field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, L_name: '' } })
        }
        if (this.state.address.Phone == undefined || this.state.address.Phone == '') {
            await this.setState({ error: { ...this.state.error, Phone: 'The Phone field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, Phone: '' } })
        }
        if (this.state.address.Email == undefined || this.state.address.Email == '') {
            await this.setState({ error: { ...this.state.error, Email: 'The Email field is required.' } })
        } else {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.address.Email)) {
                await this.setState({ error: { ...this.state.error, Email: 'Please enter type email address.' } })
            } else {
                await this.setState({ error: { ...this.state.error, Email: '' } })
            }
        }
        if (this.state.address.Street == undefined || this.state.address.Street == '') {
            await this.setState({ error: { ...this.state.error, Street: 'The Street field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, Street: '' } })
        }
        if (this.state.address.State == undefined || this.state.address.State == '' || this.state.address.State == '-') {
            await this.setState({ error: { ...this.state.error, State: 'The State field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, State: '' } })
        }
        if (this.state.address.Town == undefined || this.state.address.Town == '' || this.state.address.Town == '-') {
            await this.setState({ error: { ...this.state.error, Town: 'The Town field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, Town: '' } })
        }
        if (this.state.address.Province == undefined || this.state.address.Province == '' || this.state.address.Province == '-') {
            await this.setState({ error: { ...this.state.error, Province: 'The Province field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, Province: '' } })
        }
        if (this.state.address.Postcode == undefined || this.state.address.Postcode == '' || this.state.address.Postcode == '-') {
            await this.setState({ error: { ...this.state.error, Postcode: 'The Postcode field is required.' } })
        } else {
            await this.setState({ error: { ...this.state.error, Postcode: '' } })
        }
        if (this.state.error.F_name != '' || this.state.error.L_name != '' || this.state.error.Phone != '' || this.state.error.Email != '' || this.state.error.Street != '' || this.state.error.State != '' || this.state.error.Town != '' || this.state.error.Province != '' || this.state.error.Postcode != '') {
            return false
        }
        if (!this.state.checked) {
            if (this.state.billing.BF_name == undefined || this.state.billing.BF_name == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BF_name: 'The First Name field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BF_name: '' }, })
            }
            if (this.state.billing.BL_name == undefined || this.state.billing.BL_name == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BL_name: 'The Last Name field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BL_name: '' } })
            }
            if (this.state.billing.BPhone == undefined || this.state.billing.BPhone == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BPhone: 'The Phone field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BPhone: '' } })
            }
            if (this.state.billing.BEmail == undefined || this.state.billing.BEmail == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BEmail: 'The Email field is required.' } })
            } else {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(this.state.billing.BEmail)) {
                    await this.setState({ errorBilling: { ...this.state.errorBilling, BEmail: 'Please enter type email address.' } })
                } else {

                    await this.setState({ error: { ...this.state.error, BEmail: '' } })
                }
            }
            if (this.state.billing.BStreet == undefined || this.state.billing.BStreet == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BStreet: 'The Street field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BStreet: '' } })
            }
            if (this.state.billing.BState == undefined || this.state.billing.BState == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BState: 'The State field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BState: '' } })
            }
            if (this.state.billing.BTown == undefined || this.state.billing.BTown == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BTown: 'The Town field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BTown: '' } })
            }
            if (this.state.billing.BProvince == undefined || this.state.billing.BProvince == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BProvince: 'The Province field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BProvince: '' } })
            }
            if (this.state.billing.BPostcode == undefined || this.state.billing.BPostcode == '') {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BPostcode: 'The Postcode field is required.' } })
            } else {
                await this.setState({ errorBilling: { ...this.state.errorBilling, BPostcode: '' } })
            }
            if (this.state.errorBilling.BF_name != '' || this.state.errorBilling.BL_name != '' || this.state.errorBilling.BPhone != '' || this.state.errorBilling.BEmail != '' || this.state.errorBilling.BStreet != '' || this.state.errorBilling.BState != '' || this.state.errorBilling.BTown != '' || this.state.errorBilling.BProvince != '' || this.state.errorBilling.BPostcode != '') {
                return false
            }
        } else {
            this.setState({
                billing: {
                    ...this.state.billing,
                    BF_name: this.state.address.F_name,
                    BL_name: this.state.address.L_name,
                    BPhone: this.state.address.Phone,
                    BEmail: this.state.address.Email,
                    BStreet: this.state.address.Street,
                    BState: this.state.address.State,
                    BTown: this.state.address.Town,
                    BProvince: this.state.address.Province,
                    BPostcode: this.state.address.Postcode
                }
            })
        }
        this.callNextstep()
    }
    render() {
        return (
            <div className="cart-col_L">
                <section className="sec-formAddress">
                    {/* <form> */}
                    {this.state.nextstep != true ?
                        <div className="formAddress_Step-1">
                            <div className="formAddress-container">
                                <div className="subText">
                                    <p>Ship to a different address ?</p>
                                </div>
                                <div className="formAddress-inner">
                                    <div className="halfCol-input">
                                        <label className="label-title" for="F_name" >First Name<span>*</span></label>
                                        <input className="inputCart" type="text" name="F_name" id="F_name" value={this.state.address.F_name} required onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.F_name}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="L_name">Last Name<span>*</span></label>
                                        <input className="inputCart" type="text" name="L_name" id="L_name" value={this.state.address.L_name} onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.L_name}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="Phone">Phone Number<span>*</span></label>
                                        <input className="inputCart" type="text" name="Phone" id="Phone" value={this.state.address.Phone} onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.Phone}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="Email">E-mail<span>*</span></label>
                                        <input className="inputCart" type="email" name="Email" id="Email" value={this.state.address.Email} onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.Email}</p>
                                    </div>
                                    <div className="fullCol-input mt-4">
                                        <label className="label-title" for="Street">Street Address<span>*</span></label>
                                        <input className="inputCart" type="text" name="Street" id="Street" value={this.state.address.Street} onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.Street}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="State">State / Country<span>*</span></label>
                                        <input className="inputCart" type="text" name="State" id="State" value="ไทย" readOnly disabled />
                                        {/* <select id="State" className="selectCart" name="State" value={this.state.address.State} onChange={this.handleChange}>
                                            {
                                                dataNationality.map((items, i) => {
                                                    if (this.props.Nationality === items.nationality) {
                                                        return <option key={i} defaultValue={items.nationality}>{items.nationality}</option>
                                                    }
                                                    else if (this.props.Nationality == "" && i == 0) {
                                                        return <option key={i} defaultValue={''} value="">- Select Nationality -</option>
                                                    }
                                                    else {
                                                        return <option key={i} value={items.nationality} >{items.nationality}</option>
                                                    }
                                                })
                                            }
                                        </select> */}
                                        <p className='text-danger'>{this.state.error.State}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="Province">Province<span>*</span></label>
                                        <select id="Province" className="selectCart" name="Province" value={this.state.address.Province} onChange={(e) => this.props.handleChangeProvince(e, this.handleChange)}>
                                            <option key={i}>-</option>
                                            {
                                                dataProvinces.map((items, i) => {

                                                    return <option key={i} checked={this.state.address.Province == items.PROVINCE_NAME} >{items.PROVINCE_NAME}</option>
                                                })
                                            }
                                        </select>
                                        <p className='text-danger'>{this.state.error.Province}</p>
                                    </div>
                                    <div className="halfCol-input">
                                        <label className="label-title" for="Town">Town / City<span>*</span></label>
                                        <select id="Town" className="selectCart" name="Town" value={this.state.address.Town} onChange={(e) => this.props.handleChangeDistricts(e, this.handleChange)}>
                                        <option value="-">-</option>
                                            {
                                                this.props.District !== "" ? this.props.District.map((items, i) => {
                                                    return <option key={i} data-tag={items.DISTRICT_ID} checked={this.state.address.Town == items.DISTRICT_NAME} value={items.DISTRICT_NAME} onChange={this.props.handleOption} >{items.DISTRICT_NAME}</option>
                                                }) : <option value={this.state.address.Town}>{this.state.address.Town}</option>
                                            }
                                        </select>
                                        <p className='text-danger'>{this.state.error.Town}</p>
                                    </div>

                                    <div className="halfCol-input">
                                        <label className="label-title" for="Postcode">Postcode<span>*</span></label>
                                        <input className="inputCart" type="text" name="Postcode" id="Postcode" value={this.state.address.Postcode} onChange={this.handleChange} />
                                        <p className='text-danger'>{this.state.error.Postcode}</p>
                                    </div>
                                </div>
                            </div>
                            <label className="check-sameAddress" for="sameAddress" >
                                <input type="checkbox" name="sameAddress" value="1" id="sameAddress" onChange={this.callsection} checked={this.state.checked} />
                                <div className="check-sameAddress_wrapper">
                                    <div className="ico-check_wrapper">
                                        <i className="icon-circle-check " aria-hidden="true" />
                                    </div>
                                    <div className="sameAddress-detail">
                                        <p className="main-txt">Same Address Billing</p>
                                        <p className="sub-txt">Information is encrypted and securely stored.</p>
                                    </div>
                                </div>
                            </label>
                            {this.bindsection()}
                            <div className="orderNote-content">
                                <h5>Order Notes</h5>
                                <p>1.ต้องการใบกำกับภาษี แบบบุคคลธรรมดา กรุณากรอกข้อมูลต่อไปนี้ให้ครบถ้วนคำนำหน้าชื่อ นามสกุล เลขประจำตัวผู้เสียภาษีอากร ที่อยู่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด ประเทศ รหัสไปรษณีย์ และ เบอร์โทรศัพท์</p>
                                <p>2.ต้องการใบกำกับภาษี แบบบุคคลธรรมดา กรุณากรอกข้อมูลต่อไปนี้ให้ครบถ้วน ชื่อนิติบุคคล (สำนักงาน/สาขา) เลขประจำตัวผู้เสีย ภาษีอากร ที่อยู่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด ประเทศ รหัสไปรษณีย์ และ เบอร์โทรศัพท์</p>
                            </div>

                            <div className="input-note">
                                <label className="label-title" for="f_name">Note ({this.props.textarea_note_length.length != 0 ? this.props.textarea_note_length : '0'}/1000 )<span></span></label>
                                <textarea className="textareaCart" id="textarea-note" name="textarea_note" value={this.props.textarea_note} rows="4" onChange={this.props.handleInputChange} placeholder="ต้องการใบกำกับภาษี แบบบุคคลธรรมดา กรุณากรอกข้อมูลต่อไปนี้ให้ครบถ้วนคำนำหน้าชื่อ นามสกุล เลขประจำตัวผู้เสียภาษีอากร ที่อยู่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด ประเทศ รหัสไปรษณีย์ และ เบอร์โทรศัพท์
 " />
                            </div>
                            <div className="formAddress_btn">
                                <button className="btn-nextStep" onClick={this.validate} >NEXT</button>
                            </div>
                        </div>
                        :
                        <div className="formAddress_Step-2">
                            <div className="cfAddress-container">
                                <div className="show-detailUser">
                                    <div className="col-detailUser">
                                        <div className="subject">
                                            <h4>Shipping Address</h4>
                                        </div>
                                        <div className="detailUser_inner">
                                            <div className="detailUser-item">
                                                <h5>First Name / Last Name</h5>
                                                <p>{this.state.address.F_name} {this.state.address.L_name}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>Phone Number</h5>
                                                <p>{this.state.address.Phone}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>E-mail</h5>
                                                <p>{this.state.address.Email}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>Address</h5>
                                                <p>{this.state.address.Street} {this.state.address.Town} {this.state.address.Province} {this.state.address.Postcode} {this.state.address.State} </p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-detailUser">
                                        <div className="subject">
                                            <h4>Billing Address</h4>
                                        </div>
                                        <div className="detailUser_inner">
                                            <div className="detailUser-item">
                                                <h5>First Name / Last Name</h5>
                                                <p>{this.state.billing.BF_name} {this.state.billing.BL_name}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>Phone Number</h5>
                                                <p>{this.state.billing.BPhone}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>E-mail</h5>
                                                <p>{this.state.billing.BEmail}</p>
                                            </div>
                                            <div className="detailUser-item">
                                                <h5>Address</h5>
                                                <p>{this.state.billing.BStreet}  {this.state.billing.BTown} {this.state.billing.BProvince} {this.state.billing.BPostcode} {this.state.billing.BState}</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                {/* <div className="show-noteUser">
                                    <h5>Note</h5>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
                                    by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a
                                Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.</p>
                                </div> */}
                                <div className="cfAddress_btn">
                                    <button onClick={this.confirmAdress} data-target="" className="btn-cfAddress">CONFIRM ADDRESS</button>
                                </div>
                            </div>
                        </div>
                    }

                    {/* </form> */}
                </section>
            </div>
        )
    }
}
export default withTranslation('layout')(Address)