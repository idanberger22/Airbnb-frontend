import { Component } from 'react'
import { uploadService } from '../services/upload.service'
import { utilService } from '../services/util.service'

export class ImgUploader extends Component {
  state = {
    imgUrl: null,
    height: 100,
    width: 100,
    isUploading: false
  }
  uploadImg = async (ev) => {
    console.log('im here')
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
    this.props.onUploaded && this.props.onUploaded(secure_url, this.props.idx)
  }
  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  render() {
    const { imgUrl } = this.state
    const id = utilService.makeId()

    return (
      <div className="upload-preview"  >
        {imgUrl && <img src={imgUrl} style={{ maxWidth: '100px', float: 'right' }} />}
        {!imgUrl && <> <label htmlFor={id} className='red clickable' style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}>
            <span class="material-icons">
              drive_folder_upload
            </span>
        </label>
          <input type="file"   onChange={this.uploadImg} accept="img/*" id={id} style={{ display: 'none' }} /></>}
      </div>
    )
  }
}
