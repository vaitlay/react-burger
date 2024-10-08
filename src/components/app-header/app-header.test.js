import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, getByTestId, getByText} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppHeader from './app-header';

it('App-header рендерится корректно', () => {
    const tree = renderer
      .create(<MemoryRouter><AppHeader /></MemoryRouter>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 

it('При нажатии на ссылки в AppHeader меняются их классы', () => {
  const { container } = render(<MemoryRouter><AppHeader /></MemoryRouter>);  

  const feedLink = getByTestId(container, 'feed');
  const profileLink = getByTestId(container, 'profile');
  const burgerConstructorLink = getByTestId(container, 'burgerConstructor');
  const feedText = getByText(container, 'Лента заказов');
  const profileText = getByText(container, 'Личный кабинет');
  const burgerConstructorText = getByText(container, 'Конструктор');

  fireEvent.click(feedLink);
  expect(feedText).not.toHaveClass('text_color_inactive');
  expect(burgerConstructorText).toHaveClass('text_color_inactive');
  fireEvent.click(profileLink);
  expect(profileText).not.toHaveClass('text_color_inactive');
  expect(feedText).toHaveClass('text_color_inactive');  
  fireEvent.click(burgerConstructorLink);
  expect(burgerConstructorText).not.toHaveClass('text_color_inactive');
  expect(profileText).toHaveClass('text_color_inactive');   
  
})


