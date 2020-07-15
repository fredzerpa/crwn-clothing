import React, { Component } from 'react';
import './Directory.styles.scss';
import SECTIONS_DATA from './sections.data';
import MenuItem from '../menu-item/MenuItem.component';

class Directory extends Component {
   constructor() {
      super();
      this.state = {
         section: SECTIONS_DATA
      }
   }
   
   render() {
      return(
         <div className='directory-menu'>
            {
               this.state.section.map(({id, ...otherSectionProps}) => (
                  <MenuItem key={id} {...otherSectionProps}/>
               ))
            }
         </div>
      )
   }
   
}

export default Directory;