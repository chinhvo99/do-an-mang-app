import React from 'react';
import {
  testStyleProps, basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import Container from '..';

const target = <Container />;
const type = EnumComponent.HOC;

describe('Container Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      backgroundColor: '#FF8C00',
    };
    testStyleProps(target, props, type);
  });

  it('should apply all custom props', () => {
    /**
     * scroll
     */
    const props3 = getComponent(target, { scroll: true }, type).props();
    expect(props3.testID).toBe('ContainerScrollView');
  });
});
