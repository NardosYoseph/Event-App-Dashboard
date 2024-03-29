
class Event {
  constructor(id,title, description, date, time,price,availableTickets,image,status,attendee,eventOrganizer) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.price = price;
    this.availableTickets = availableTickets;
    this.image = image;
    this.status = status;
    this.attendee=attendee;
    this.eventOrganizer=eventOrganizer;

  }
}

export default Event;
  