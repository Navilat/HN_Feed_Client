import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name : 'customTitle'
})
export class CustomTitlePipe implements PipeTransform{
    transform(title: string, story_title: string): string{
        let chosenTitle;
        (story_title === null) ? chosenTitle = title : chosenTitle = story_title;
        return chosenTitle;
    }
}