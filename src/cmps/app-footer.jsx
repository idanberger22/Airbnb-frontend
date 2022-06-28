import { reservationService } from "../services/reservation.service"
import { UserMsg } from "./user-msg"
export function AppFooter() {

    return (

        <div id="main-footer" className="stock-margin fixed main-footer footer-desktop">
            {/* <div className="stock-margin-center"> */}
                <div className="footer ">
                    <div className="left-side">
                        <li><h1>Staybnb LTD.</h1></li>
                        <li>·</li>
                        <li><h1>Privacy</h1></li>
                        <li>·</li>
                        <li><h1>Terms</h1></li>
                        <li>·</li>
                        <li><h1>Sitemap</h1></li>
                    </div>
                    <div className="right-side">
                        <li>
                            <span className="material-icons">language</span>
                        </li>
                        <li>English(US)</li>
                        <li>·</li>
                        <li>$ USD</li>
                        <li>·</li>
                        <li>Support & Resources</li>
                    </div>

                </div>
            </div>

    )
}