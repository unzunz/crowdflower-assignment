import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../containers/App';

it('sums numbers', () => {
  expect(2).toEqual(2);
  expect(3).toEqual(3);
});

it('renders without crashing', () => {
  shallow(<App foundFetchError={ false } isModified={ false }
               foundPostError={ false } tasks={ [] } dispatch={ () => {} }/>);
});

it ('correctly adds a new task', () => {

})

it ('correctly updates a modified task', () => {

})

it ('correctly saves tasks', () => {

})
