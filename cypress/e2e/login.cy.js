import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

            afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

   it('Верный пароль и верный логин', function () {
      
        cy.get(main_page.email).type(data.login); // ввела верный логин
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click(); // нажала "Войти"

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка наличия нужного текста
    })
     it('Восстановление пароля', function () {
      
        cy.get(main_page.fogot_pass_btn).click(); // нашла поле "Забыли пароль?" и нажала на него
        cy.get(recovery_password_page.email).type(data.login) // нашла поле для ввода почты и вписала почту
        cy.get(recovery_password_page.send_button).click(); // нашла поле "отправить код" и нажала на него

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка наличия нужного текста
    })
     it('Правильный логин.НЕправильный пароль', function () {
      
        cy.get(main_page.email).type(data.login);// нашла поле для ввода логина и вписала логин
        cy.get(main_page.password).type('iLoveqastudio'); // нашла поле для ввода пароля и ввела НЕВЕРНЫЙ пароль
        cy.get(main_page.login_button).click(); // нашла кнопку "Войти" и нажала на нее

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка наличия нужного текста
    })
     it('НЕравильный логин.Правильный пароль', function () {
      
        cy.get(main_page.email).type('german@dolnik.ru');// нашла поле для ввода логина и вписала НЕверный логин
        cy.get(main_page.password).type(data.password); // нашла поле для ввода пароля и ввела пароль
        cy.get(main_page.login_button).click(); // нашла кнопку "Войти" и нажала на нее

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка наличия нужного текста
    })
    it('Проверка валидации', function () {
      
        cy.get(main_page.email).type('germandolnikov.ru');// нашла поле для ввода логина и ввела логин без @
        cy.get(main_page.password).type(data.password); // нашла поле для ввода пароля и ввела пароль
        cy.get(main_page.login_button).click(); // нашла кнопку "Войти" и нажала на нее

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка наличия нужного текста
    })
   it('Строчные буквы в логине', function () {
      
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввела верный логин с разным регистром
        cy.get(main_page.password).type(data.password); // ввела верный пароль
        cy.get(main_page.login_button).click(); // нажала "Войти"

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка наличия нужного текста
    })
})

