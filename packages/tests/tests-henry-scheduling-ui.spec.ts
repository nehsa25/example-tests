import { test, expect } from '@playwright/test';
import { TestSettings } from './TestUtility/test_settings';
import HenryScheduleAppointmentState, { HenryScheduleAppointmentStateUtility } from './pages/schedule_appointment.page';

const testSettings = new TestSettings();
const henryScheduleAppointmentStateUtility = new HenryScheduleAppointmentStateUtility();

// For each supported state, validate we get correct page title for each state
for (const state in henryScheduleAppointmentStateUtility.SUPPORTED_STATES) {

  // get the friendly state name
  const stateName = henryScheduleAppointmentStateUtility.SUPPORTED_STATES[state];

  // run test for each state
  test.fixme(`Henry Scheduling: \"${stateName}\" has correct page title`, async ({ page }) => {
    const henryScheduleAppointmentState = new HenryScheduleAppointmentState(page, testSettings);
    let queryParams = `?state=${stateName}`
    await henryScheduleAppointmentState.goto(henryScheduleAppointmentState.path, queryParams);

    // select a time

  });
}
