import React, { Component } from 'react'
import { withTranslation } from '../../i18n'
import Cartcomfirm from '../Cart/cartcomfirm'
class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            nextstep: false
        }
    }
    render() {
        return (
            <section className="sec-confirm sec-productCart">
                <div className="table-order inner_productCart">
                    <Cartcomfirm/>
                    <div className="show-noteUser">
                        <h5>Note</h5>
                        <p>{this.props.note}
                        </p>
                    </div>

                </div>
            </section>
        )
    }
}
export default withTranslation('layout')(Confirm)