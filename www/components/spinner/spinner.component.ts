import {Component} from 'angular2/core';

@Component({
    selector: 'sm-spinner',
    template: `
        <!--http://codepen.io/brunjo/pen/WbrjKw#0: The MIT License (MIT) Copyright (c) <year> <copyright holders> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.-->
        <div class="sm-spinner"></div>

        <style>
            .sm-spinner {
                margin: 50px;
                height: 28px;
                width: 28px;
                animation: rotate 0.8s infinite linear;
                border: 8px solid rgba(0, 0, 0, .25);
                border-right-color: transparent;
                border-radius: 50%;
            }

            @keyframes rotate {
                0%    { transform: rotate(0deg); }
                100%  { transform: rotate(360deg); }
            }
        </style>
    `
})

export class SpinnerComponent {
    constructor() {}
}
