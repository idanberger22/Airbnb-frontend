import { Component } from 'react'
import { uploadService } from '../services/upload.service'

export class ImgUploader extends Component {
  state = {
    imgUrl: null,
    height: 100,
    width: 100,
    isUploading: false
  }
  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
    this.props.onUploaded && this.props.onUploaded(secure_url,this.props.idx)
  }
  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  componentDidMount() {
    console.log('state',this.state)
  }
  render() {
    const { imgUrl} = this.state

    return (
      <div className="upload-preview"  >
        {imgUrl && <img src={imgUrl} style={{maxWidth: '100px', float: 'right'}} />}
        {/* <label htmlFor="imgUpload">{ this.uploadMsg }</label> */}
        {!imgUrl && <input type="file" onChange={ this.uploadImg } accept="img/*" id="imgUpload" />}
      </div>
    )
  }
}
