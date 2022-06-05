import { reservationService } from "../services/reservation.service"
import { UserMsg } from "./user-msg"
export function AppFooter() {

    return (
        
            <div className="fixed footer ">

                <div className="left-side">
                    <li><h1>cofferights 2022</h1></li>
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
                    <li>Support & resources</li>
                </div>
                
        </div>
      
    )
}