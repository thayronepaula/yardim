import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Json2csvService } from '../services/json2csv.service';
import { take } from 'rxjs';
import { ICsvHistory } from '../interfaces/table.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private static validateJson(stringJson?: any): {
    isValid: boolean;
    reason?: string;
  } {
    if (!stringJson) return { isValid: false, reason: 'JSON não informado' };

    const isValidJSON = (str: string) => {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (!isValidJSON(stringJson))
      return { isValid: false, reason: 'JSON inválido' };

    return { isValid: true };
  }

  private json2csvService = inject(Json2csvService);

  now = new Date();
  form = new FormGroup({
    json: new FormControl<string>(
      '[\n  {\n    "name": "Thayrone Paula",\n    "year": 2030,\n    "url": "https://www.google.com"\n  }\n]',
      { nonNullable: true }
    ),
    csv: new FormControl(''),
  });

  csvHistory: ICsvHistory[] = [];

  constructor() {}

  download(csv = this.form.get('csv')?.value) {
    let csvContent = 'data:text/csv;charset=utf-8,' + csv;
    const encodedUri = encodeURI(csvContent!);
    window.open(encodedUri, 'pi');
  }

  clear() {
    this.form.reset({ json: '', csv: '' });
  }

  convert() {
    const { json } = this.form.getRawValue();

    const result = AppComponent.validateJson(json);

    if (!result.isValid)
      Swal.fire({
        icon: 'error',
        title: 'Validação do JSON falhou. Verifique o campo!',
        text: result.reason,
      });

    const convertData = JSON.parse(json);
    this.json2csvService
      .convert({ json: convertData })
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.form.get('csv')?.setValue(data.csv);

          this.csvHistory.push({
            id: this.csvHistory.length + 1,
            fileName: `Arquivo-${this.csvHistory.length + 1}`,
            csv: data.csv,
            createdAt: new Date(),
          });
        },
      });
  }
}

[
  {
    album: 'The White Stripes',
    year: 1999,
    US_peak_chart_post: '-',
  },

  {
    album: 'De Stijl',
    year: 2000,
    US_peak_chart_post: '-',
  },
  {
    album: 'White Blood Cells',
    year: 2001,
    US_peak_chart_post: 61,
  },
  {
    album: 'Elephant',
    year: 2003,
    US_peak_chart_post: 6,
  },
  {
    album: 'Get Behind Me Satan',
    year: 2005,
    US_peak_chart_post: 3,
  },
  {
    album: 'Icky Thump',
    year: 2007,
    US_peak_chart_post: 2,
  },
  {
    album: 'Under Great White Northern Lights',
    year: 2010,
    US_peak_chart_post: 11,
  },
  {
    album: 'Live in Mississippi',
    year: 2011,
    US_peak_chart_post: '-',
  },
  {
    album: 'Live at the Gold Dollar',
    year: 2012,
    US_peak_chart_post: '-',
  },
  {
    album: 'Nine Miles from the White City',
    year: 2013,
    US_peak_chart_post: '-',
  },
];
