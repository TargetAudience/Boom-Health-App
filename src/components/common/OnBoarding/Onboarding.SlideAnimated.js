import React, { useState, useImperativeHandle, forwardRef } from 'react'

import { Slide } from './Onboarding.Slide';

//Controls animatation on slides
export const SlideAnimated = forwardRef(({title, text, image, Animation}, ref) => {

  //only animate once screen is in view the first time
  const [isInitialView, setIsInitialView] = useState(false);
  //passes a handle to the parent to control start of animation once slide is in view
  useImperativeHandle(ref, () => ({
    startAnimation() {
      setIsInitialView(true);
    }
  }));
  return (
    <Slide
      title={title}
      text={text}
      image={image}
    >
    { Animation != null && isInitialView && <Animation></Animation> }
    </Slide>
  );
});
