describe('Покупка нового аватара для покемона', function () {

   it('Верный пароль и верный логин', function () {
        cy.visit('https://pokemonbattle.ru/'); // зашла на сайт
        cy.get('#k_email').type('USER_LOGIN') // найти поле "Почта" и ввести в него верную почту
        cy.get('#k_password').type('USER_PASSWORD') // найти поле "Пароль" и ввести в него верный пароль
        cy.get('.MuiButton-root').click(); // найти поле "Войти" и кликнуть по ней
        cy.wait(4000);
        cy.get('.header_card_trainer').click(); // найти окно с моим тренером и кликнуть по нему
        cy.wait(4000);
        cy.get('.k_mobile > :nth-child(5)').click(); // найти окно "Смена аватара" и кликнуть по нему
        cy.wait(4000);
        cy.get('.available > button').first().click(); // кликнуть "купить" у первого доступного аватара

        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4620869113632996') // найти поле для ввода номер карты и ввести номер
        cy.get(':nth-child(1) > .style_1_base_input').type('1226') // найти поле для ввода срока действия карты и ввести его
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125') // найти поле для ввода CVC и ввести его
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('NAME') // найти поле для ввода имени владельца и ввести его
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // найти кнопку "Оплатить" и нажать на нее
        cy.wait(5000);
        cy.get('.style_1_base_input').type('56456'); // найти окно для ввода кода из смс и ввести код
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // найти кнопку "Оплатить" и нажать на нее
        cy.wait(4000);
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно'); // Проверить появление сообщения об успешной покупке
        cy.get('.success__image').should('be.visible'); // Проверить наличие зеленой галочки

   })
})
