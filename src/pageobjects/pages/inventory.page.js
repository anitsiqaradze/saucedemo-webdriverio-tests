const Page = require("./page")

class InventoryPage extends Page {
    constructor(){
        super("inventory");
    }
    get title(){
        return $(".app_logo");
    }

}

module.exports = InventoryPage;