import React from 'react';
import {useState } from 'react';
import CharacterList from '../components/CharacterList';
import SearchForm from '../components/SearchForm';
import SearchTitle from '../components/SearchTitle';
import CharacterSearch from '../components/CharacterSearch';
import NameField from '../components/NameField';
import GenderField from '../components/GenderField';
import SortField from '../components/SortField';

function CharacterSearchContainer() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const { sortedCharacters, sortOption, setSortOption } = CharacterSearch(name, gender);


  return (
    <>
      <div className="pt-20" />
      <SearchTitle />
      <div className="pt-8" />
      <SearchForm>
        <NameField name={name} setName={setName} />
        <GenderField gender={gender} setGender={setGender}/>
        <SortField sortOption={sortOption} setSortOption={setSortOption} />
      </SearchForm>
      <div className="pt-12" />
      <CharacterList characters={sortedCharacters} />
      <div className="pt-16" />
    </>
  );
}

export default CharacterSearchContainer;
