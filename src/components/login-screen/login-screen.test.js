import React from "react";
import renderer from "react-test-renderer";
import {LoginScreen} from "./login-screen";

const noop = () => {};

it(`LoginScreen component render correctly`, () => {
  const tree = renderer.create(
      <LoginScreen
        onReplayButtonClick={noop}
        onSubmit={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
