import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, onAnswerResetPlayer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
      onAnswerResetPlayer();

      this.setState({
        answers: new Array(this.props.question.answers.length).fill(false),
      });
    }

    handleChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice();
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameType.GENRE]).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
    onAnswerResetPlayer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
