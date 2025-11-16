const Page = require("./page")


class LoginPage extends Page{
    constructor(){
        super("/");
    }

       get inputUsername () {
            return $('#user-name');
        }
    
        get inputPassword () {
            return $('#password');
        }
    
        get btnSubmit () {
            return $('#login-button');
        }

        get error_message(){
            return $("h3[data-test='error']");
        }

        async submit(){
            await this.btnSubmit.click();
        }

        async clearField(element) {
          await element.click();
          await browser.keys(['Control', 'a']);
          await browser.keys('Backspace');
        }

        async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

module.exports = LoginPage;