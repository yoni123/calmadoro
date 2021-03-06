import React from 'react'
import YouTube from 'react-youtube'
import VideoCover from './videoCover'

class MusicItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: "", videoChosenId: "" }
    this.youtubeOpts = {
      height: '100%',
      width: '100%',
      playerVars: {
        origin: document.origin
      }
    };
    // console.log(document.origin)
  }

  videoChosen = (videoId) => {
    this.props.videoChosen(videoId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ videoChosenId: newProps.choosenVideoId })
    if (newProps.choosenVideoId === this.youtube.props.videoId && newProps.playMusic) {
      this.youtube.internalPlayer.loadVideoById(newProps.choosenVideoId)
    }
    if (newProps.stopMusic) {
      this.youtube.internalPlayer.stopVideo();
    }
  }

  render() {
    return (
      <div className="music-box col-xl-2 col-sm-4">
        <VideoCover videoChosenId={this.state.videoChosenId} videoChosen={this.videoChosen} videoId={this.props.videoId} />
        <YouTube videoId={this.props.videoId} ref={(video) => this.youtube = video} opts={this.youtubeOpts} />
      </div>
    )
  }
}

export default MusicItem;