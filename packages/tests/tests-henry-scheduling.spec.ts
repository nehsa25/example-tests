import { test, expect } from '@playwright/test';
import { TestSettings } from './TestUtility/test_settings';
import HenryScheduleAppointmentState, { HenryScheduleAppointmentStateUtility } from './pages/schedule_appointment.page';


// ## Tasks
// Given our onboarding flow at https://onboard-dev.henrymeds.com?override_kameleoon
// 1. Provide an automated test suite that includes the pages for reserving an appointment time and the contact details form. There is no need to continue through the payment screen.
// 2. The appointment times displayed are retrieved via an API query.  Provide an API level test for that query.

const testSettings = new TestSettings();
const henryScheduleAppointmentStateUtility = new HenryScheduleAppointmentStateUtility();


for (const state in henryScheduleAppointmentStateUtility.SUPPORTED_STATES) {

  // get the friendly state name
  const stateName = henryScheduleAppointmentStateUtility.SUPPORTED_STATES[state];

  // run test for each state
  test(`Henry Scheduling: \"${stateName}\" can access appointment times`, async ({ page }) => {
    const henryScheduleAppointmentState = new HenryScheduleAppointmentState(page, testSettings);
    let queryParams = `?state=${stateName}`
    await henryScheduleAppointmentState.goto(henryScheduleAppointmentState.path, queryParams);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(henryScheduleAppointmentState.title);
  });
}
