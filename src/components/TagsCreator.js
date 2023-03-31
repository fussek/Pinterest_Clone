import React from 'react';
import '../styles/tags_creator_styles.css';

function TagsCreator(props) {
  const removeTags = (indexToRemove) => {
    props.setTags([...props.tags.filter((_, index) => index !== indexToRemove)]);
  };

  return (
    <div className='tags-container'>
      <div className='tags-input'>
        <ul id='tags'>
          {props.tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon' onClick={() => removeTags(index)}>
                🞬
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TagsCreator;
