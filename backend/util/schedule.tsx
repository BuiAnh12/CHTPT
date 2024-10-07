import schedule from 'node-schedule';
import { ref, update } from 'firebase/database';
import { database, readData } from './firebase';

interface ScheduledTask {
    flightId: string;
    seatId: string;
    registerTime: string;
    job: schedule.Job;
}

let timeoutDuration = 10 * 1000;

// Function to set the timeout duration
export const setTimeOut = (timeout) => {
    // Ensure the timeout is a number and greater than 0
    if (typeof timeout === 'number' && timeout > 0) {
        timeoutDuration = timeout * 1000; // Convert seconds to milliseconds
    } else {
        console.error('Invalid timeout value. It should be a positive number.');
    }
};

// Function to get the current timeout duration
export const getTimeOut = () => {
    return timeoutDuration / 1000; // Return timeout in seconds
};

export const scheduledTasks: ScheduledTask[] = [];

// Function to schedule seat reset after a timeout
export const scheduleSeatReset = (flightId: string, seatId: string, registerTime: string) => {
    // Schedule the job for resetting the seat after timeout
    const job = schedule.scheduleJob(new Date(Date.parse(registerTime) + timeoutDuration), async () => {
        // Reset the seat status to free after timeout
        await update(ref(database, `flights/${flightId}/seats/${seatId}`), {
            status: 'free',
            registeredBy: null,
            registeredAt: null,
        });
        console.log(`Seat ${seatId} on flight ${flightId} has been reset to free due to timeout.`);
        // Remove the task from the scheduledTasks array after execution
        cancelSeatReset(flightId, seatId);
    });

    // Add the scheduled task to the array
    scheduledTasks.push({ flightId, seatId, registerTime, job });
};

// Function to cancel seat reset
export const cancelSeatReset = (flightId: string, seatId: string) => {
    const taskIndex = scheduledTasks.findIndex(
        (task) => task.flightId === flightId && task.seatId === seatId
    );
    if (taskIndex !== -1) {
        // Cancel the scheduled job
        scheduledTasks[taskIndex].job.cancel();
        // Remove the task from the array
        scheduledTasks.splice(taskIndex, 1);
        console.log(`Canceled reset for seat ${seatId} on flight ${flightId}.`);
    }
};

// Function to reload jobs from Firebase database based on existing data
export const reloadJob = async () => {
    const path = `flights`;
    const result = await readData(path);

    if (!result) return; // Handle no data case

    Object.keys(result).forEach( async (flightId) => {
        const flight = result[flightId];

        if (flight.seats) {
            Object.keys(flight.seats).forEach( async (seatId) => {
                const seat = flight.seats[seatId];

                if (seat.status === 'register' && seat.registeredBy && seat.registeredBy.timestamp) {
                    const { timestamp } = seat.registeredBy;
                    const registerTime = new Date(timestamp).toISOString();
                    // Calculate time remaining until the seat should reset
                    const currentTime = new Date().getTime();
                    const timePassed = currentTime - Date.parse(registerTime);

                    if (timePassed < timeoutDuration) {
                        // Schedule the seat reset with the remaining time
                        scheduleSeatReset(flightId, seatId, registerTime);
                        console.log(`Reloaded job for seat ${seatId} on flight ${flightId}.`);
                    } else {
                        // If timeout has already passed, reset the seat immediately
                        await update(ref(database, `flights/${flightId}/seats/${seatId}`), {
                            status: 'free',
                            registeredBy: null,
                            registeredAt: null,
                        });
                        console.log(`Seat ${seatId} on flight ${flightId} has been reset to free after reload.`);
                    }
                }
            });
        }
    });
};
