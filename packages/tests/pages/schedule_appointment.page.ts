import BasePage from './base.page';

// https://onboard-dev.henrymeds.com/app/appointment/weightloss-phen?override_kameleoon

export default class HenryScheduleAppointmentState extends BasePage {
    public name: string = "henry-schedule-appointment";
    private _pagePath: string = 'app/appointment/weightloss-phen?override_kameleoon';
    private _title: string = 'Phentermine Appointment - Henry Meds'
    get title(): string { return this._title }    
    get path(): string { return `${this.settings.APP_ENVIRONMENT}/${this._pagePath}`; };

    // locators
    get getHeaderTitle() { return this.page.getByTestId('header-title'); }
}

export class HenryScheduleAppointmentStateUtility {
    public SUPPORTED_STATES: string[] = [
        "Alabama",
        "California",
        "Colorado",
        "Florida",
        "Georgia",
        "Illinois",
        "Maryland",
        "Massachusetts",
        "New Hampshire",
        "Texas",
        "Utah",
        "virginia",
        "Washington",
        // "Other State" this goes to not supported yet page
    ]
}
