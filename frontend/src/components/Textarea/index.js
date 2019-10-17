import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import TextAreaAutosize from 'react-textarea-autosize';

export default function Textarea({ name, ...rest }) {
  const { defaultValue, registerField } = useField(name);

  const [text, setText] = useState(defaultValue);

  const ref = useRef();

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref]); //eslint-disable-line

  async function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <TextAreaAutosize
        onChange={handleChange}
        ref={ref}
        defaultValue={defaultValue}
        value={text}
        {...rest}
      />
    </>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
};
