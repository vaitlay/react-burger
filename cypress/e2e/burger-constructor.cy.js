import { API_ENTRY_POINT, API_LOAD_INGREDIENTS, API_USER_DATA, API_ADD_ORDER, API_LOGIN } from '../../src/utils/api'

describe('Check main (burger-constructor) page ', () => {

  beforeEach(() => {
    cy.intercept('GET', `${API_ENTRY_POINT}${API_LOAD_INGREDIENTS}`, {fixture: "ingredients"})
    cy.intercept('POST', `${API_ENTRY_POINT}${API_LOGIN}`, {fixture: "login-success"}).as('postLogin')
    cy.intercept('GET', `${API_ENTRY_POINT}${API_USER_DATA}`, {fixture: "user"})
    cy.intercept('POST', `${API_ENTRY_POINT}${API_ADD_ORDER}`, {fixture: "order-success"}).as('postCreateOrder')
    window.localStorage.setItem(
      "accessToken", JSON.stringify('test-accessToken')
    );
    cy.visit('http://localhost:3000');
  });  


  it("should open and close ingredient Details", () => {

    cy.get('[data-test-id="ingredientCard"]')
      .first()
      .as('card')
      .should('contain.text','Краторная булка')
      .click();

    cy.get('[data-test-id="modal"]').as('modal')
      .should('contain.text', 'Детали ингредиента')
    cy.get('body').type('{esc}')  //Press Escape
    cy.get('@modal').should('not.exist');

    cy.get('@card').click();
    cy.get('@modal').children().first().children().last().click() //Press ModalCloseIcon
    cy.get('@modal').should('not.exist');

    cy.get('[data-test-id="ingredientCard"]').last().click();
    cy.get('[data-test-id="modalOverlay"]').click({force: true})  //Press outside modal
    cy.get('@modal').should('not.exist');  
  })

  it("should correctly drag & drop ingredients into constructor and create Order", () => {

    cy.get('[data-test-id="ingredientCard"]').children().get('img').as('ingredients'); //массив ингредиентов
    cy.get('[data-test-id="bunsConstructor"]').as('buns'); //место под булки
    cy.get('[data-test-id="betweenBunsConstructor"]').as('betweenBuns'); //место под межбулочные ингредиенты


    //Добавление ингредиентов
    cy.get('[data-test-id="createOrderBtn"]').as('createOrder').should('be.disabled') //кнопка создать заказ не активна

    cy.get('@ingredients').eq(1).trigger('dragstart'); //соус
    cy.get('@betweenBuns').trigger('drop');  
    cy.get('@createOrder').should('be.disabled'); //кнопка созать заказ все еще не активна
    cy.get('@ingredients').eq(0).trigger('dragstart'); //булка
    cy.get('@buns').trigger('drop');
    cy.get('@createOrder').should('be.enabled') // кнопка созать заказ теперь активна
    cy.get('@ingredients').eq(1).trigger('dragstart'); //соус
    cy.get('@betweenBuns').trigger('drop');  
    cy.get('@ingredients').eq(2).trigger('dragstart'); //начинка
    cy.get('@betweenBuns').trigger('drop');   

    cy.get('@betweenBuns').children()
      .should('have.length',3)
      .should('contain.text','котлета') 
      .should('contain.text','Соус') 
      .should('not.contain.text', 'булка')
    
    //Удаление ингредиентов и попытка добавления к неправильному типу
    cy.get('.constructor-element__action').eq(3).click(); //удаление начинки
    cy.get('.constructor-element__action').eq(0).click(); //попытка удалить булку
    cy.get('@ingredients').eq(0).trigger('dragstart'); 
    cy.get('@betweenBuns').trigger('drop');   // попытка добавить булку вместо межбулочного ингредиента
    cy.get('@ingredients').eq(1).trigger('dragstart');
    cy.get('@buns').trigger('drop');  // попытка добавить межбулочный ингредиент вместо булки    

    cy.get('@betweenBuns').children()
      .should('have.length',2)
      .should('not.contain.text','котлета') 
      .should('not.contain.text', 'булка')
      .should('contain.text','Соус') 
   
    //Изменение порядка ингредиентов
    cy.get('@ingredients').eq(2).trigger('dragstart'); //начинка
    cy.get('@betweenBuns').trigger('drop');   
    cy.get('@betweenBuns').children().last().trigger('dragstart');
    cy.get('@betweenBuns').children().first().trigger('drop');

    cy.get('@betweenBuns').children().first().should('contains.text','котлета');
    cy.get('@betweenBuns').children().last().should('contains.text','Соус');

    ///Проверка создания заказа
    cy.get('@createOrder').click();
    //введение логина и пароля
    cy.get('input').first().type('testEmail@email.ru');
    cy.get('input').last().type('password123');
    cy.get('button').contains('Войти').click();
    cy.wait('@postLogin').its("request.body").should('deep.equal', { email: 'testEmail@email.ru', password: 'password123'})
    //создание заказа
    cy.get('@createOrder').click();
    cy.wait('@postCreateOrder').its("request.body").should('deep.equal', {ingredients: ['id_bun','id_main','id_sauce','id_sauce','id_bun']} )
    //проверка присвоение номера заказа
    cy.get('p')
      .should('contain.text','1111')
      .should('contain.text','идентификатор заказа')
  });
  



}); 


// 
// 