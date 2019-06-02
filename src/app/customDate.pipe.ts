import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name : 'customDate'
})
export class CustomDatePipe implements PipeTransform{
    transform(rawDateString: string): string{
        let currentDate = new Date();
        let rawDate = new Date(rawDateString);

        
        let dayDif = currentDate.getDate()-rawDate.getDate();

        if (dayDif < 1){
            //print hour:min
            let hours = rawDate.getHours();
            let mins = rawDate.getMinutes();
            let minsStr;
            let m = 'am';

            if (hours >= 13){
                hours = hours-12;
                m = 'pm';
            }
            if (mins < 10){
                minsStr = '0' + mins.toString();
            }else{
                minsStr = mins.toString();
            }
            return hours.toString() + ':' + minsStr + ' ' + m;
        }else if ((dayDif >= 1) && (dayDif < 2)){
            return "Yesterday";
        }else{
            return rawDate.toLocaleString('en-us', { month: 'short' }) + ' ' + rawDate.getDate().toString();
        }
    }
}