import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = ({ events, onSelectEvent, date, onNavigate, view, onView }) => {
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#3174ad',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };

    switch (event.type) {
      case 'client':
        style.backgroundColor = '#4CAF50';
        break;
      case 'installation':
        style.backgroundColor = '#2196F3';
        break;
      case 'maintenance':
        style.backgroundColor = '#FFC107';
        break;
      default:
        break;
    }

    return { style };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={onSelectEvent}
      date={date}
      onNavigate={onNavigate}
      view={view}
      onView={onView}
      eventPropGetter={eventStyleGetter}
    />
  );
};

CalendarView.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
      type: PropTypes.oneOf(['client', 'installation', 'maintenance']).isRequired
    })
  ).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onNavigate: PropTypes.func.isRequired,
  view: PropTypes.oneOf(['month', 'week', 'day', 'agenda']).isRequired,
  onView: PropTypes.func.isRequired
};

export default CalendarView;