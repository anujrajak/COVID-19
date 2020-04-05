import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  data = [
    {
      title: "Wash hands frequently",
      img: "wash_hands.svg",
      class: "measuresCard",
      description: `Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.
      Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.`
    },
    {
      title: "Social distancing",
      img: "social_distancing.svg",
      class: "measuresCard2",
      description: `Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.
      Why? When someone coughs or sneezes they spray small liquid droplets from their nose or mouth which may contain virus. If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person coughing has the disease.`
    },
    {
      title: "Stay at home",
      img: "stay_home.svg",
      class: "measuresCard2",
      description: `Stay at home if you begin to feel unwell, even with mild symptoms such as headache and slight runny nose, until you recover.
      Why? Avoiding contact with others and visits to medical facilities will allow these facilities to operate more effectively and help protect you and others from possible COVID-19 and other viruses.`
    }
  ];

}
