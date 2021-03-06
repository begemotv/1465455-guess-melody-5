import React, {PureComponent} from "react";
import Player from "../../components/audio-player/audio-player";
import withAudio from "../with-audio/with-audio";

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0
      };

      this.handleResetPlayer = this._handleResetPlayer.bind(this);
    }

    _handleResetPlayer() {
      this.setState({
        activePlayerId: 0,
      });
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        onAnswerResetPlayer={this.handleResetPlayer}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={() => this.setState({
                activePlayerId: activePlayerId === id ? -1 : id
              })}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
