import { Window } from '../Window';

export const RESUME_JSX =  <object data="/desktop_files/resume.pdf" type="application/pdf" width="100%" height="100%">
<p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
</object>

export var ResWindShowing = true;
export const setResWindShowing = (val: boolean) => {
  ResWindShowing = val;
}