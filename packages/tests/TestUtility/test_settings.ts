import HenryScheduleAppointmentState from "../pages/schedule_appointment.page";

/** Settings objects containing test settings and utility funtions*/
export class TestSettings {
    public APP_ENVIRONMENT = 'https://onboard-dev.henrymeds.com'

    /** Every License Portal page.  All pages should be in this list. */
    public PAGE_DEFINITIONS = [
        HenryScheduleAppointmentState,
    ];

    defaultTimeoutSecs = 60;
    defaultTimeoutMs = this.defaultTimeoutSecs * 1000;
    constructor(public page: any = null) {
    }
}