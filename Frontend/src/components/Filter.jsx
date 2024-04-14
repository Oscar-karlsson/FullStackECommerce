import React from 'react';
import { List, ListItem, Checkbox, FormControlLabel } from '@material-ui/core';

const Filter = ({ categories, selectedCategories, onCategoryChange }) => {
  const handleToggle = (value) => () => {
    const currentIndex = selectedCategories.indexOf(value);
    const newChecked = [...selectedCategories];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onCategoryChange(newChecked);
  };

  return (
    <List>
      {categories.map((category) => {
        const labelId = `checkbox-list-label-${category}`;

        return (
          <ListItem key={category} role={undefined} dense button onClick={handleToggle(category)}>
            <Checkbox
              edge="start"
              checked={selectedCategories.indexOf(category) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
            <FormControlLabel label={category} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Filter;