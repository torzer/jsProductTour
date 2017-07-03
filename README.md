# jsProductTour

This is a javascript library that uses intro.js and js-cookies to manage a Product Tour
based on cookies to control when and what already was presented to the user.

## Instalation

### Bower

Put the package information in the dependencies section of the bower.json file.

```json
    {
        "dependencies": {
            "js-product-tour": "^1.0"
        }
    }
```

Then run

```
    bower update
```

This will install _jsProductTour_ and its own dependencies, wich are introjs and js-cookie.

## Configuring

You must import in HTML code the js and css source files of introjs, js-cookie and jsProductTour.
The following example is based on a local project, you must change the paths according your project installation:

```html
    <!-- CSS -->
    <link rel="stylesheet" href="bower_components/intro.js/minified/introjs.min.css">
    <link rel="stylesheet" href="bower_components/intro.js/themes/introjs-flattener.css">
    <link rel="stylesheet" href="bower_components/js-product-tour/src/tour.css">

    <!-- JS -->
    <script src="bower_components/intro.js/minified/intro.min.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    <script src="bower_components/js-product-tour/src/tour.js"></script>
```

## Using

To use the tour, create an array with the steps (slides) to be showed to the user.
Set the `version` information with a sequential number, that must allways increase,
so the library can evaluate wich slides where not yet showed when new releases, news or informations
are deployed to the user.

Script example to start a tour:

```javascript
    var steps = [
        {
            wellcome: true,
            intro: "Wellcome, this slide is allways showed and no version is needed because \n\
                it is set as a 'wellcome' slide. This slide is not linked with any HTML element."
        },
        {
            bye: true,
            intro: "This is also allways showed, but as the last slide!"
        },
        {
            version: 20170627.01,
            element: "#id-element",
            intro: "This is a slide that is gonna be showed next linked element."
        },
        {
            version: 20170627.02,
            element: "#another",
            intro: "Another slide with news related to the another element."
        },
        {
            version: 20170627.03,
            element: "#last-one",
            intro: "Last slide showed."
        },
    ];

    var tour = new Tour(user, steps);

    tour.start();
```

### Laravel use example

At your layout master:

```html
        <!-- HEAD SECTION -->

        <!-- TOUR -->
        <link rel="stylesheet" href="{{asset('bower_components/intro.js/minified/introjs.min.css')}}">
        <link rel="stylesheet" href="{{asset('bower_components/intro.js/themes/introjs-flattener.css')}}">
        <link rel="stylesheet" href="{{asset('bower_components/js-product-tour/src/tour.css')}}">

        <!-- BEFORE END BODY -->

        <!-- TOUR -->
        <script src="{{ asset ("/bower_components/intro.js/minified/intro.min.js")}}"></script>
        <script src="{{ asset ("/bower_components/js-cookie/src/js.cookie.js")}}"></script>
        <script src="{{ asset ("/bower_components/js-product-tour/src/tour.js")}}"></script>
        
        <!-- This is a script of your application with steps configuration -->
        <script src="{{ asset ("/js/showTour.js")}}"></script>

        <!-- execute after document is ready, if using jQuery -->
        <script>
            $(document).ready(function(){
                @if(Auth::check())
                    showTour("{{Auth::user()->email}}");
                @endif
            });
        </script>        
```

The `public/js/showTour.js` 

```js

function showTour(user) {
    var steps = [
        {
            wellcome: true,
            intro: "Wellcome, this slide is allways showed and no version is needed because \n\
                it is set as a 'wellcome' slide. This slide is not linked with any HTML element."
        },
        {
            bye: true,
            intro: "This is also allways showed, but as the last slide!"
        },
        {
            version: 20170627.01,
            element: "#id-element",
            intro: "This is a slide that is gonna be showed next linked element."
        },
        {
            version: 20170627.02,
            element: "#another",
            intro: "Another slide with news related to the another element."
        },
        {
            version: 20170627.03,
            element: "#last-one",
            intro: "Last slide showed."
        },
    ];

    var tour = new Tour(user, steps);

    tour.start();
}

```

