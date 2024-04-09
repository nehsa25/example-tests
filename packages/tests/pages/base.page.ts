
import { Page } from '@playwright/test';

/** All pages inherit from this page */
export default class BasePage {
    name: string = "";
    constructor(public page: Page, public settings: any = null) {
        this.page = page;
        this.settings = settings;
    }

    // use website to navigate
    async navigateTo() { 
        throw new RangeError("N/A");
    }

    // go directly
    async goto(path: string, quaryParameters: string = "") {
        let newPath = path;
        if (quaryParameters != "") {
            newPath = newPath.split("?")[0];
            newPath += `${quaryParameters}`;
        }
        console.log(newPath);
        await this.page.goto(newPath);
    }
}