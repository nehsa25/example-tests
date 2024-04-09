import { test, expect, request } from "@playwright/test";
import { HenryScheduleAppointmentStateUtility } from "./pages/schedule_appointment.page";

const henryScheduleAppointmentStateUtility = new HenryScheduleAppointmentStateUtility();

// validate we cannot ask for dates in the past
test(`Henry Scheduling: cannot get appointment times for date in past`, async ({ page }) => {
  // Create a context that will issue our post request
  const context = await request.newContext({
    baseURL: "https://henry-dev.hasura.app",
  });

  const getAppointmentTimes = await context.post("/v1/graphql", {
    data: {
      operationName: 'cappedAvailableTimes',
      query: `query cappedAvailableTimes($state: String!, $treatmentShortId: String!, $minimumDate: timestamptz!, $maximumDate: timestamptz!) {
         cappedAvailableTimes: appointment_capped_available_appointment_slots(
           where: {start_time: {_gt: $minimumDate, _lt: $maximumDate}, state: {_eq: $state}, treatment_object: {short_id: {_eq: $treatmentShortId}}, language: {_eq: "en-US"}, provider: {_and: {id: {_is_null: false}}}}
           order_by: {start_time: asc}
         ) {
           ...CappedAvailableSlotsFragment
           __typename
         }
       }
       
       fragment CappedAvailableSlotsFragment on appointment_capped_available_appointment_slots {
         startTime: start_time
         endTime: end_time
         provider {
           id
           displayName: display_name
           __typename
         }
         __typename
       }`,
      variables: {
        "maximumDate": "2024-03-22T22:02:29.929Z",
        "minimumDate": "2024-03-11T22:02:29.929Z",
        "state": "california",
        "treatmentShortId": "weightloss"
      }
    }
  });
  const result = await getAppointmentTimes.json();
  expect(result.data.cappedAvailableTimes.length).toBeLessThan(1);
});

// For each supported state, validate we can get appointment times
for (const state in henryScheduleAppointmentStateUtility.SUPPORTED_STATES) {

  // get the friendly state name
  const stateName = henryScheduleAppointmentStateUtility.SUPPORTED_STATES[state];

  // run test for each state
  test(`Henry Scheduling: \"${stateName}\" can get appointment times`, async ({ page }) => {
    // Create a context that will issue our post request
    const context = await request.newContext({
      baseURL: "https://henry-dev.hasura.app",
    });

    const getAppointmentTimes = await context.post("/v1/graphql", {
      data: {
        operationName: 'cappedAvailableTimes',
        query: `query cappedAvailableTimes($state: String!, $treatmentShortId: String!, $minimumDate: timestamptz!, $maximumDate: timestamptz!) {
         cappedAvailableTimes: appointment_capped_available_appointment_slots(
           where: {start_time: {_gt: $minimumDate, _lt: $maximumDate}, state: {_eq: $state}, treatment_object: {short_id: {_eq: $treatmentShortId}}, language: {_eq: "en-US"}, provider: {_and: {id: {_is_null: false}}}}
           order_by: {start_time: asc}
         ) {
           ...CappedAvailableSlotsFragment
           __typename
         }
       }
       
       fragment CappedAvailableSlotsFragment on appointment_capped_available_appointment_slots {
         startTime: start_time
         endTime: end_time
         provider {
           id
           displayName: display_name
           __typename
         }
         __typename
       }`,
        variables: {
          "maximumDate": "2024-04-22T22:02:29.929Z",
          "minimumDate": "2024-04-11T22:02:29.929Z",
          "state": stateName.toLowerCase(),
          "treatmentShortId": "weightloss"
        }
      }
    });
    const result = await getAppointmentTimes.json();
    expect(result.data.cappedAvailableTimes.length).toBeLessThan(1);
  });
}

