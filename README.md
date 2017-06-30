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
    <link rel="stylesheet" href="css/tour.css">

    <!-- JS -->
    <script src="bower_components/intro.js/minified/intro.min.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    <script src="js/tour.js"></script>
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
            intro: "Wellcome, this slide is allways showed and no version is needed because
                it is set as a 'wellcome' slide."
        },
        {
            bye: true,
            intro: "This is also allways showed, but as the last slide!"
        },
        {
            version: 20170627.01,
            element: "#links-ajuda",
            intro: "Para uma visão geral de uso do sistema, acesse um dos links de ajuda."
        },
        {
            version: 20170627.02,
            element: "#titulo-periodo-trabalho",
            intro: "A partir desta versão iniciaremos o trabalho de planejamento dos próximos períodos do PDI\n\
                                    , portanto, para identificar o <strong>período</strong> em que você está trabalhando, ele será fixado nesta área em \n\
                                    todas as janelas do sistema."
        },
        {
            version: 20170627.03,
            element: "#menu-encerramento-periodo",
            intro: "Neste momento estamos na 2<sup>a</sup> etapa destinada a análise e finalização do período 2013-2017, \n\
                    acesse o menu <em>Encerramento do Período</em> para \n\
                    entrar com as considerações a respeito do PDI."
        },
    ];

    var tour = new Tour(user, steps);

    tour.start();
```