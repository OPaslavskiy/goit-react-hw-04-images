import React, { useState } from 'react';
import {
  SearchbarHeder,
  SearchbarForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
  Lebel,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '100px',
  timeout: 1500,
  fontSize: '20px',
});

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const newSearch = event.target.value;
    setValue(newSearch);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      Notiflix.Notify.warning('Enter a search parameter');
    } else {
      onSearch(value);
    }
    setValue('');
  };

  return (
    <>
      <Lebel href="https://github.com/OPaslavskiy">by OPaslavskyi</Lebel>
      <SearchbarHeder>
        <SearchbarForm onSubmit={handleSubmit} status={'pending'}>
          <SearchFormBtn type="submit">
            <FcSearch
              style={{
                height: '32px',
                width: '32px',
              }}
            />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </SearchbarForm>
      </SearchbarHeder>
    </>
  );
};
