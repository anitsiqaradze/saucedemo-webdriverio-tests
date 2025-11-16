const LoginPage = require("../pageobjects/pages/login.page");
const InventoryPage = require("../pageobjects/pages/inventory.page");

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

describe("Login page", ()=>{
    beforeEach(async()=>{
        await loginPage.open();
    })
    
    
    it("Given user navigates to site, When page loads, Then displays 'Swag Labs' title", async()=>{ 

        const test_data = {expected:"Swag Labs"}

        await expect(browser).toHaveTitle(test_data.expected);
        
    })

     
    it("Displays 'Username is required' error after clearing filled credentials and clicking login", async()=>{
        
        const test_data = { args: {username:"any_user", password:"any_password"}, expected: "Username is required" };
    
        await loginPage.inputUsername.setValue(test_data.args.username);
        await loginPage.inputPassword.setValue(test_data.args.password);

        await loginPage.clearField(loginPage.inputUsername);
        await loginPage.clearField(loginPage.inputPassword);

        await loginPage.submit();

        await expect(loginPage.error_message).toBeDisplayed();
        await expect(loginPage.error_message).toHaveText(expect.stringContaining(test_data.expected))

        
    })

    it("Displays 'Password is required' error after clearing filled credentials and clicking login", async()=>{
        const test_data = { args: {username:"any_user", password:"any_password"}, expected: "Password is required" };

        await loginPage.inputUsername.setValue(test_data.args.username);
        await loginPage.inputPassword.setValue(test_data.args.password);

        await loginPage.clearField(loginPage.inputPassword);
        await loginPage.submit();
        
        await expect(loginPage.error_message).toBeDisplayed();
        await expect(loginPage.error_message).toHaveText(expect.stringContaining(test_data.expected))

    })

    it("Authenticates user with valid credentials and redirects to /inventory`", async()=>{
        const test_data = { args: {username:"standard_user", password:"secret_sauce"}, expected: "Swag Labs" };
        
        await loginPage.login(test_data.args.username, test_data.args.password);

        await expect(inventoryPage.title).toBeExisting();
        await expect(inventoryPage.title).toHaveText(test_data.expected);
    })


   
})