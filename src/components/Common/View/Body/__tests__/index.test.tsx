import React from 'react';
import {
  basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import { lightTheme } from '@themes';
import Body from '..';

const target = <Body />;
const type = EnumComponent.HOC;

describe('Body Component', () => {
  basicTest(target, type, 2);

  it('should apply all custom props', () => {
    /**
     * scroll
     */
    const props = getComponent(target, { scroll: true }, type).props();
    expect(props.testID).toBe('SafeAreaBodyScrollView');

    const props2 = getComponent(target, {
      fullView: true, fullHeight: true, scroll: true,
    }, type).props();
    expect(props2.testID).toBe('BodyScrollView');

    /**
     * primary, secondary
     */
    const props3 = getComponent(target, { primary: true }, type).props();
    expect(props3.children.props.style.backgroundColor).toBe(lightTheme.colors.bgColor);

    const props4 = getComponent(target, { secondary: true }, type).props();
    expect(props4.children.props.style.backgroundColor).toBe(lightTheme.colors.bgColorSecondary);

    /**
     * fullWidth, fullHeight, fullView
     */
    const props5 = getComponent(target, { fullWidth: true }, type).props();
    expect(props5.children.props.style.paddingHorizontal).toBe(0);
    expect(props5.testID).toBe('SafeAreaBodyView');

    const props6 = getComponent(target, { fullHeight: true }, type).props();
    expect(props6.testID).toBe('FullHeightBodyView');
    expect(props6.style.paddingHorizontal).toBe(lightTheme.bodyPaddingHorizontal);

    const props7 = getComponent(target, { fullView: true }, type).props();
    expect(props7.testID).toBe('FullHeightBodyView');
    expect(props7.style.paddingHorizontal).toBe(0);
  });
});
