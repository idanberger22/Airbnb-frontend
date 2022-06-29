
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"
import { Checkbox, createTheme, FormControl, FormControlLabel, FormGroup, MuiThemeProvider, Radio, RadioGroup, TextField } from "@material-ui/core"
import { ImgUploader } from "../cmps/img-uploader"

export const HostYourHome = () => {

    var loggedinUser = userService.getLoggedinUser()

    const [newStay, setNewStay] = useState(
        {
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
            }, imgUrls: [
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg'
            ],
            amenities: [],
            address: {
                street: "Queens, NY, United States",
                country: "United States",
                city: 'tel aviv',
                countryCode: 'IL',
                location: {
                    lat: -73.88025,
                    lan: 40.74953,

                }
            }

            , reviewScores: { value: Math.round(utilService.getRandomFloat(8.5,10) * 10)/10 },
            reviews: [
                {
                    at: "2016-10-14T04:00:00.000Z",
                    by: {
                        _id: "622f3406e36c59e6164fbaf7",
                        fullname: "Leonila",
                        imgUrl: "https://cdn.pixabay.com/photo/2017/10/05/11/47/smiling-face-2819150_960_720.jpg",
                        id: "95535426"
                    },
                    txt: "The experience is the first for me and I was say it's a good one. The couple is very friendly and it's. Very clean place, and you go in and out as you please. Only drawback, no parking like anywhere else."
                }]
        }
    )
    const [newAddress, setNewAddress] = useState(null)
    const [type, setType] = useState({ entire: true, hotel: true, private: true, shared: true });
    const [amenities, setAmenities] = useState('Wifi');
    useEffect(() => {
    }, [newStay])

    const onUploaded = (imgUrl, idx) => {
        const imgs = newStay.imgUrls
        imgs[idx] = imgUrl
        setNewStay({ ...newStay, imgUrls: imgs });
    }

    const theme = createTheme({
        overrides: {
            MuiOutlinedInput: {
                root: {
                    // Hover state
                    "&:hover $notchedOutline": {
                        borderColor: '222222'
                    },
                    // Focused state
                    "&$focused $notchedOutline": {
                        borderColor: '#FE385C'
                    }
                },
                // Default State
                notchedOutline: {
                    borderColor: 'B0B0B0'
                }
            }
        }
    })
    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        if (field === 'city' || field === 'country' || field === 'street' || field === 'country-code') {
            setNewStay({ ...newStay, address: { ...newStay.address, [field]: value } })

        }
        else setNewStay({ ...newStay, [field]: value })
    }

    const handleEmnitiesChange = ({ target }) => {
        const amenity = target.name
        if (newStay.amenities.includes(amenity)) {
            setNewStay({ ...newStay, amenities: newStay.amenities.filter(amn => amn !== amenity) })
        }
        else setNewStay({ ...newStay, amenities: [...newStay.amenities, amenity] })
    }

    const handleTypeChange = ({ target }) => {
        const type = target.value
        setNewStay({ ...newStay, roomType: type })
    }

    const uploadStay = async () => {
        const stayToUpload = await stayService.addStay(newStay)
        if (stayToUpload) console.log('new stay has been added')
        else console.log('couldnt add a stay')


    }
    if(document.body.clientWidth<920) return <h1 style={{margin:'auto',padding:'100px 20px'}}>Oops! uploading a stay from a smaller device is currently unavailable...<br/>
    Please connect from a PC for a full experience.</h1> 

    return (
        <div className="main-upload-stay">
            <h1>Upload a stay to host</h1>
            <div className="container">
                <div className="details-form">
                    <MuiThemeProvider theme={theme}>
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Property name" name="name" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Summary" name="summary" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country" name="country" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="City" name="city" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Street" name="street" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country code" name="country-code" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                        <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Price per night" name="price" variant="outlined" InputLabelProps={{ style: { color: '#222222' } }} />
                    </MuiThemeProvider>
                </div>
                <div className="checkboxes">

                    <h1 style={{ marginBottom: '0.8rem' }}>Amenities:</h1>

                    <div className="emnities">
                        <FormGroup>
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="TV" label="TV" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Wifi" label="Wifi" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Kitchen" label="Kitchen" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Air conditioning" label="Air conditioning" />
                        </FormGroup>
                    </div>
                    <h1 style={{ marginBottom: '0.8rem', marginTop: '0.8rem' }}>Type of Place:</h1>
                    <div className="type">
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Entire home/apt" label="Entire home/apt" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Hotel room" label="Hotel room" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Private room" label="Private room" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Shared room" label="Shared room" />
                            </RadioGroup>
                        </FormControl>

                    </div>

                </div>
                <div className="img-upload-gallery">
                    <li><ImgUploader onUploaded={onUploaded} idx={0} /></li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={1} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={2} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={3} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={4} />
                    </li>
                </div>
            </div>
            <div className="upload-btn-container" >
                <NavLink className='clickable' to='/host'>
                    <button className="reserve-button" onClick={uploadStay} >upload</button>
                </NavLink>
            </div>
        </div>
    )
}

    // <UploadStay getStays={getStays} showUploadStayTogle={showUploadStayTogle} />}

