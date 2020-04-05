import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private http: HttpClient,
  ) {
    
  }

  URLS = {
    countries: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv`,
    daysWise: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`,
    globalDailyReport: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-02-2020.csv`
  }

  countries = [];
  isCollapsedDeaths = true;
  total = 0;
  active = 0;
  recovered = 0;
  deaths = 0;
  cases = [];
  isCollapsed = true;
  table2 = true;
  loading = true;

  values:any;

  ngOnInit(){
    this.http.get(this.URLS.globalDailyReport, { responseType: 'text' })
    .subscribe((text) => {
      let data = [];
      let obj = {};
      let lines = text.split('\n');
      
      lines.forEach(l => {
        let line = l.split(/,(?=\S)/);

        let case_ = {
          FIPS: line[0],
          Admin2: line[1],
          Province_State: line[2],
          Country_Region: line[3],
          Last_Update: line[4],
          Lat: line[5],
          Long_: line[6],
          Confirmed: line[7],
          Deaths: line[8],
          Recovered: line[9],
          Active: line[10],
          Combined_Key: line[11],
        }

        let tempcase = obj[case_.Country_Region]
        if (tempcase) {
          tempcase.Confirmed = Number((+tempcase.Confirmed) + (+case_.Confirmed)).toString()
          tempcase.Deaths = Number((+tempcase.Deaths) + (+case_.Deaths)).toString()
          tempcase.Recovered = Number((+tempcase.Recovered) + (+case_.Recovered)).toString()
          obj[case_.Country_Region] = tempcase
        } else {
          obj[case_.Country_Region] = case_;
        }
      });

      let values = Object.values(obj)
      this.values = values;
      console.log(this.values);
      this.cases.push.apply(this.cases , values);
      values.splice(0 , 1);
      values.forEach((cs:any) => {
        if(Number.isInteger((+cs.Confirmed)))  
        this.total = this.total + (+cs.Confirmed )
        if(Number.isInteger((+cs.Deaths)))  
        this.deaths += (+cs.Deaths )
        if(Number.isInteger((+cs.Recovered)))  
        this.recovered += (+cs.Recovered )
        if(Number.isInteger((+cs.Active)))  
        this.active += (+cs.Active )
      })
    });
  }

  getCountries() {
    this.http.get(this.URLS.countries, {responseType: 'text'})
    .subscribe((text) => {
      let countries = [];
      let lines = text.split('\n')
      lines.forEach(line => {
        let data = line.split(/,(?=\S)/);
        countries.push({
          Country: data[7]
        });
      });

      let obj = {};
      countries.forEach(c => {
        obj[c.Country] = c;
      })
      
      return obj;
    }); 
  }

  getGlobalData() {
    let me = this;
    this.http.get(this.URLS.globalDailyReport, { responseType: 'text' })
    .subscribe((text) => {
      let data = [];
      let obj = {};
      let lines = text.split('\n');
      
      lines.forEach(l => {
        let line = l.split(/,(?=\S)/);

        let case_ = {
          FIPS: line[0],
          Admin2: line[1],
          Province_State: line[2],
          Country_Region: line[3],
          Last_Update: line[4],
          Lat: line[5],
          Long_: line[6],
          Confirmed: line[7],
          Deaths: line[8],
          Recovered: line[9],
          Active: line[10],
          Combined_Key: line[11],
        }

        let tempcase = obj[case_.Country_Region]
        if (tempcase) {
          tempcase.Confirmed = Number((+tempcase.Confirmed) + (+case_.Confirmed)).toString()
          tempcase.Deaths = Number((+tempcase.Deaths) + (+case_.Deaths)).toString()
          tempcase.Recovered = Number((+tempcase.Recovered) + (+case_.Recovered)).toString()
          obj[case_.Country_Region] = tempcase
        } else {
          obj[case_.Country_Region] = case_;
        }
      });

      let values = Object.values(obj)
      // console.log(values);
      me.values = values;
    });
  }

  getDayWiseCases() {
    this.http.get(this.URLS.daysWise, { responseType: 'text' })
    .subscribe(result => {
      let dateList = [];
      let r = [];
      console.log(result);
      let rows = result.split('\n');

      let header = rows.splice(0, 1)[0]
      let headerValue = header.split(/,(?=\S)/)
      headerValue.forEach(h => {
        if (!Number.isNaN(Date.parse(h))) {
          dateList.push(h)
        }
      })
      console.log(dateList);

      let contryCasesDateWise = {};

      // console.log(rows);
      rows.forEach(row => {
        let cols = row.split(/,(?=\S)/);

        let contry = cols[1]
        cols.splice(0, 4)
        // console.log(cols);

        cols.forEach((c, index) => {
          let value = contryCasesDateWise[contry];
          let cas;
          cas.cases = +c;
          cas.date = dateList[index]
          cas.status = 'Confirmed'
          if (value) {
            value.push(cas)
          } else {
            contryCasesDateWise[contry] = [];

            contryCasesDateWise[contry].push(cas)
          }
        })
      })

      console.log(contryCasesDateWise);
      return contryCasesDateWise;
    })
  }
  
  country: any[] = this.values;
  countryFilter: any = {Country_Region: ''};

}
