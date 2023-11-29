import React from 'react';
import renderer from 'react-test-renderer';

import Buscador from '../screens/Buscador';

describe('<Buscador />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Buscador />).toJSON();
    expect(tree.children.length).toBe(4);
  });
});