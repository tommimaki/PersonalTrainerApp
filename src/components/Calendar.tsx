
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


interface Training {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: {
        firstname: string;
        lastname: string;
    } | null;
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<EventInput[]>([]);


    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://traineeapp.azurewebsites.net/gettrainings');
            const data: Training[] = await response.json();

            const calendarEvents: EventInput[] = data.map(training => {
                const startTime = new Date(training.date);
                const endTime = new Date(startTime.getTime() + training.duration * 60000);
                const customerName = training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : '';
                const title = `${endTime.getHours()}:${endTime.getMinutes()} ${training.activity} - ${customerName} - (${training.duration} min)`;
                const newEvent: EventInput = {
                    title,
                    start: startTime,
                    end: endTime,
                    displayEventEnd: true,
                    displayEventTime: true,
                };
                return newEvent;
            });

            setEvents(calendarEvents);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <div style={{ marginTop: '10px' }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                views={{
                    listDay: { buttonText: 'list day' },
                    listWeek: { buttonText: 'list week' },
                    listMonth: { buttonText: 'list month' },
                }}
                headerToolbar={{
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                locale="fi"
                eventColor="#378006"
                eventBackgroundColor="darkblue"
                eventDisplay="block"
                events={events}
            />
        </div>
    );
};

export default Calendar;
