# AngularJS directive for incrementing a counter form input field

A directive for making a [plus/minus input](http://bootsnipp.com/snippets/featured/buttons-minus-and-plus-in-input) based on the work of [Maikel Daloo](http://maikeldaloo.com/post/angularjs-counter-directive).

## Demo
http://Firestitch.github.io/angular-counter/

## Dependencies
- required:
	Bootstrap for styling

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. Install with bower:
    
    ```sh
    bower install angular-counter
    ```

2. Include `counter.min.js` or `counter.js` in your html.

3. Include the module in angular (i.e. in `app.js`) - `Firestitch.angular-counter`

    ```js
    angular.module('myApp', [
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngAnimate',
        ...
        'Firestitch.angular-counter'
    ])
    ```

1. See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation

See the `counter.js` file top comments for usage examples and documentation
https://github.com/Firestitch/angular-counter/blob/master/counter.js

| Attribute              | Default | Description                                                       |
| ---------------------- | ------- | ----------------------------------------------------------------- |
| min/data-min           | null    | A minimum value, never to go below.                               |
| max/data-min           | null    | A maximum value, never to go above.                               |
| step/data-step         | 1       | How much to increment/decrement by.                               |
| addclass/data-addclass | null    | Add a class to the container.                                     |
| width/data-width       | null    | Set the width of the input field.                                 |
| editable/data-editable | false   | Whether the field is readyonly or not. By default, it's readonly. |

```html
<div fs-counter value="someValue"
    data-min="0"
    data-max="100"
    data-step="1"
    data-addclass="someClass"
    data-width="130px"
    data-editable
    ></div>
```

## Development

1. Fork this repo.
1. `git checkout gh-pages`
	1. run `npm install && bower install`
	2. write your code then run `grunt`
	3. git commit your changes
2. copy over core files (.js and .css/.less for directives) to master branch
	1. `git checkout master`
	2. `git checkout gh-pages counter.js counter.min.js counter.less counter.css counter.min.css`
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes
	2. git tag with the version number, i.e. `git tag v1.0.0`
4. Create a [pull request](https://github.com/Firestitch/angular-counter/pulls).
