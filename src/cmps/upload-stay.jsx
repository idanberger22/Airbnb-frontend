import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"
import { ImgUploader } from "./img-uploader"
import { TextField } from "@material-ui/core"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"


export const UploadStay = () => {


    
    const [newStay, setNewStay] = useState(null)
    const [newAddress, setNewAddress] = useState(null)
    let loggedinUser = userService.getLoggedinUser()



    useEffect(() => {
        setNewStay({
            _id: utilService.makeId(),
            host: {
                _id: loggedinUser._id,
                fullname: loggedinUser.fullName,
                location: "Eureka, California, United States",
                about: "Adventurous couple loves to travel :)",
                responseTime: "within an hour",
                thumbnailUrl: loggedinUser.imgUrl,
                pictureUrl: loggedinUser.imgUrl,
                isSuperhost: true,
                id: utilService.makeId()
            }, imgUrls: [], 
            address: {
                street : "Queens, NY, United States",
                country : "United States",
                city: 'tel aviv',
                countryCode: 'IL',
                location : {
                    lat : -73.88025,
                    lan : 40.74953,
                    
                }
            }
                
                ,reviewScores: { value: 5 },
            reviews : [ 
                {
                    at : "2016-10-14T04:00:00.000Z",
                    by : {
                        _id : "622f3406e36c59e6164fbaf7",
                        fullname : "Leonila",
                        imgUrl : "https://cdn.pixabay.com/photo/2017/10/05/11/47/smiling-face-2819150_960_720.jpg",
                        id : "95535426"
                    },
                    txt : "The experience is the first for me and I was say it's a good one. The couple is very friendly and it's. Very clean place, and you go in and out as you please. Only drawback, no parking like anywhere else."
                }]
        })
    }, [])

    useEffect(() => {
        console.log(newStay)
    }, [newStay])

    const onUploaded = (imgUrl) => {
        const imgs = newStay.imgUrls
        imgs.push(imgUrl)
        setNewStay({ ...newStay, imgUrls: imgs });
    }



    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        console.log('field', field)
        if (field === 'city' || field === 'country' || field === 'street' || field === 'country-code') {
            // const newAddress = newAddress.address
            // setNewAddress({ ...newAddress, [field]: value })
            setNewStay({ ...newStay,  address: {...newStay.address, [field]: value}})

        }
        else setNewStay({ ...newStay, [field]: value })

        console.log('newStay',newStay)
    }

    const uploadStay = async () => {
        const stayToUpload = await stayService.addStay(newStay)
        if (stayToUpload) console.log('new stay has been added')
        else console.log('couldnt add a stay')
    }



    return (
        <div className="main-upload-stay">
            <div className="container">

                <h1>upload a stay to host</h1>
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Property name" name="name" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Summary" name="summary" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country" name="country" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="City" name="city" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Street" name="street" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country code" name="country-code" variant="outlined" />
                <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Price per night" name="price" variant="outlined" />
                <ImgUploader onUploaded={onUploaded} />
            </div>

            <button onClick={uploadStay} >upload</button>


        </div>
    )
}