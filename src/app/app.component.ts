import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacebookService } from './services/fb.service';
interface ICard {
  description?: string;
  endTime?: string;
  id?: string;
  name?: string;
  startTime?: string;
  imageUrl?: string;
  fblink?: string;
  place?: string;
}
class Card {
  public description: string;
  public end_time: string;
  public id: string;
  public name: string;
  public start_time: string;
  public imageUrl: string;
  public fblink?: string;
  public place?: string;

  constructor(obj?: ICard) {
    this.description = obj.description || 'Card Title';
    this.end_time = obj.endTime || 'Card Subtitle';
    this.id = obj.id ||
      'Some card content should be placed here. Description or other related information.';
    this.name = obj.name || '';
    this.start_time = obj.startTime || '';
    this.imageUrl = obj.imageUrl || 'assets/ny.jpg';
    this.fblink = obj.fblink || '';
    this.place = obj.place || '';
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public cards: Card[] = [];
  public events: any[] = [];

  constructor(private fbService: FacebookService) {
    this.fbService.loadSdk();
  }

  ngOnInit() {
    const self = this;

    this.fbService.getEvents().then((json: any) => {
      const today = new Date();

      // Get only upcoming events
      const	upcomingEvents = json.data.filter(function	(danceEvent){
        const evt = new Date(danceEvent.start_time);
        return today < evt;
      });

      // Sort them by start date
      const sortedEvents = upcomingEvents.sort(function(a, b) {
        return (a['start_time'] > b['start_time']) ? 1 : ((a['start_time'] < b['start_time']) ? -1 : 0);
      });

      for (const event of sortedEvents)
      {
        self.cards.push(
          new Card({
            imageUrl: 'assets/dance.jpg',
            id: event.id,
            name: event.name,
            description: event.description.substr(0, 300),
            endTime: new Date(event.end_time).toLocaleString(),
            startTime: new Date(event.start_time).toLocaleString(),
            fblink: 'https://www.facebook.com/events/' + event.id,
            place: event.place === undefined ? '' : event.place.name
          }),
        );
      }
    });
  }
}
