import React from "react";

// Define the type of each event
interface LogEvent {
    time: string
    type: string;
    message: string;
}

interface LogTableProps {
    eventList: LogEvent[];
}

const LogTable: React.FC<LogTableProps> = ({ eventList }) => {
    return (
        <div className='bg-gray-800 p-4 rounded shadow-md max-h-96 overflow-y-auto'> {/* Set max height and enable scrolling */}
            <table className='table-auto w-full text-left text-sm text-white'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Time</th>
                        <th className='px-4 py-2'>Type</th>
                        <th className='px-4 py-2'>Event</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList.map((event, index) => (
                        <tr key={index} className='bg-gray-700'>
                            <td className='border px-4 py-2'>{event.time}</td>
                            <td className='border px-4 py-2'>{event.type}</td>
                            <td className='border px-4 py-2'>{event.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default LogTable;
