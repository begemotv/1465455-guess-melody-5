import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this.handleButtonClick = this._handleButtonClick.bind(this);

  }

  componentDidMount() {
    const {src} = this.props;

    this._audio = new Audio(src);

    this._audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true
      });
    };

    this._audio.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio = null;
  }

  _handleButtonClick(evt) {
    evt.preventDefault();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this.handleButtonClick}
        />
        <div className="track__status">
          <audio />
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};
