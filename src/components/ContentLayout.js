import React from 'react';
import Card from './Card';

function ContentLayout() {
  return (
    <div style={styles.content_container}>
      <Card size='small' />
      <Card size='medium' />
      <Card size='small' />
      <Card size='medium' />
      <Card size='large' />
      <Card size='small' />
      <Card size='medium' />
      <Card size='large' />
      <Card size='small' />
      <Card size='medium' />
      <Card size='large' />
      <Card size='small' />
      <Card size='medium' />
      <Card size='large' />
      <Card size='large' />
      <Card size='large' />
    </div>
  );
}

const styles = {
  content_container: {
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    width: '80vw',
    backgroundColor: 'black',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 250px)',
    gridAutoRows: '10px',
  },
};

export default ContentLayout;
