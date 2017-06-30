# jsProductTour

This is a javascript library that uses intro.js and js-cookies to manage a Product Tour
based on cookies to control when and what already was presented to the user.

## Instalation

### Bower

Put the package information in the dependencies section of the bower.json file.

```.json
    {
        dependencies": {
            "jsProductTour": "^1.0"
        }
    }
```

Then run

```
    bower update
```

This will install _jsProductTour_ and its own dependencies, wich are introjs and js-cookie.

## Configuring

You must import in HTML code the js source files of introjs, js-cookie and jsProductTour.
The following example is based on a local project, you must change the paths according your project installation:

```html
```