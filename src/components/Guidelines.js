import React, { useState } from 'react';
import '../styles/guidelines_styles.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function Guidelines() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <div className='guidelines_modal'>
      <div className='guidelines_container'>
        <div className='small_side' id='left_side_guidelines'>
          <div className='guidelines_section'>
            <Button shape='circle' icon={<LeftOutlined />} style={{ opacity: '0.8' }} />
          </div>
        </div>
        <div className='small_side' id='central_side_guidelines'>
          <div className='guidelines_section'>
            <div className='guidelines_image'>
              <img src='./images/loupe.png' alt='loupe' style={{ maxHeight: '50%', opacity: '0.5' }} />
            </div>
          </div>
        </div>
        <div className='small_side' id='right_side_guidelines'>
          <div className='guidelines_section'>
            <Button shape='circle' icon={<RightOutlined />} style={{ opacity: '0.8' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guidelines;
