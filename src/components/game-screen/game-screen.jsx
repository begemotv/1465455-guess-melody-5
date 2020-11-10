import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import {GameType, MAX_MISTAKE_COUNT} from '../../const';
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import Mistakes from "../mistakes/mistakes";
import {incrementMistake, incrementStep, resetGame} from "../../store/action";

import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";

const QuestionArtistScreenHOC = withActivePlayer(QuestionArtistScreen);
const QuestionGenreScreenHOC = withActivePlayer(withUserAnswer(QuestionGenreScreen));

const GameScreen = (props) => {
  const {
    mistakes,
    onUserAnswer,
    questions,
    step
  } = props;
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to="/lose" />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to="/result" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <QuestionArtistScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </QuestionArtistScreenHOC>
      );
    case GameType.GENRE:
      return (
        <QuestionGenreScreenHOC
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </QuestionGenreScreenHOC>
      );
  }

  return <Redirect to="/" />;
};

GameScreen.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
      genre: PropTypes.string,
      picture: PropTypes.string,
      artist: PropTypes.string,
    })).isRequired,
    genre: PropTypes.string,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }),
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  })).isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = ({DATA, GAME}) => ({
  step: GAME.step,
  mistakes: GAME.mistakes,
  questions: DATA.questions
});

const mapDispatchToProps = (dispatch) => ({
  resetGameAction() {
    dispatch(resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(incrementStep());
    dispatch(incrementMistake(question, answer));
  }
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
