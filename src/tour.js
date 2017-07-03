/**
 * Product tour manager based on js-cookie and intro.js
 *
 * @author Ademir Mazer Junior <mazer@torzer.com>
 */

if (typeof extendObj === undefined || typeof extendObj === 'undefined') {
    function extendObj(obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key))
                obj[key] = src[key];
        }
        return obj;
    }
}

/**
 * jsProductTour constructor initializes variables, steps, configs, loads the cookie
 * information with the last seen version of the slides and force the cookie persistence
 *
 * @param string user Name of the user to be used as namespace for the cookie
 * @param array steps Array with the slides to show
 * @param JsonObject options @see introjs
 * @returns {Tour}
 */
var Tour = function(user, steps, options) {
    if ( ! steps ) {
        throw new Error("Steps are required to instantiate Tour");
    }

    this.steps = steps;
    this.stepsToShow = [];
    this.step_showing = -1;
    this.complete = false;

    this.user = user || undefined;

    this.cookie = {last_version_seen: 0};

    this.cookie = extendObj(this.cookie, Cookies.getJSON(this.cookieNamespace()));

    this.options = {
        nextLabel: 'próximo >>',
        prevLabel: '<< anterior',
        skipLabel: 'Não mostrar agora',
        doneLabel: 'Finalizar guia',
        hidePrev: true,
        hideNext: true,
        showStepNumbers: false,
        highlightClass: 'highlight-tour-element',
        tooltipClass: 'tour-custom',
        scrollToElement: true,
    };
    this.options = extendObj(this.options, options);

    // force save to persist cookie
    this.saveLastVersionSeen();
};

/**
 * Defines the cookie namespace based on the user passed to constructor
 *
 * @returns {String}
 */
Tour.prototype.cookieNamespace = function() {
    namespace = this.user || 'guest';
    return 'tour_' + namespace;
}

/**
 * Evaluate the steps that must be shown based on cookie informations for this user.
 * Sets the stepsToShow propertie of the tour object.
 *
 * @returns {Array|Tour.steps}
 */
Tour.prototype.getStepsToShowByLastSeen = function() {
    var wellcome;
    var bye;

    for (var key in this.steps) {
        if (this.steps[key].wellcome) {
            wellcome = this.steps[key];
        } else if (this.steps[key].bye) {
            bye = this.steps[key];
        } else if (this.cookie.last_version_seen < this.steps[key].version) {
            this.stepsToShow.push(this.steps[key]);
        }
    }

    if (this.stepsToShow.length > 0) {
        this.stepsToShow.unshift(wellcome);
        this.stepsToShow.push(bye);
    }

    return this.stepsToShow;
};

/**
 * Save the cookie with the information to be used in the next page reload
 *
 * @returns {undefined}
 */
Tour.prototype.saveLastVersionSeen = function() {
    var version_seen;

    // wellcome only save again to persist cookie if a F5 is pressed
    if (this.step_showing >= 0 ) {
        if (this.stepsToShow[this.step_showing].bye) {
            version_seen = this.stepsToShow[this.step_showing - 1].version;
        } else {
            version_seen = this.stepsToShow[this.step_showing].version;
        }
    }

    if (version_seen) {
        this.cookie.last_version_seen = version_seen;
    }

    Cookies.set(this.cookieNamespace(), this.cookie, { expires: 365 * 3 });
}

/**
 * Remove the cookie to refresh the tour
 *
 * @returns {undefined}
 */
Tour.prototype.cookieRefresh = function() {
    Cookies.remove(this.cookieNamespace());
}

/**
 * Start the tour, after check if there is any slide to be shown.
 *
 * @param JsonObject startOptions {force: false}
 * @returns {undefined}
 */
Tour.prototype.start = function(startOptions) {
    // prepare the steps to show based on the cookies with the
    // last seen information in this machine
    if (startOptions != undefined && startOptions.force === true) {
        this.stepsToShow = this.steps;
        options = {
            steps: this.steps
        };
    } else {
        options = {
            steps: this.getStepsToShowByLastSeen()
        };
    }

    // if there is no step or if there is only wellcome and bye steps
    // return because we do not nothing to show
    if (options.steps.length == 0) {
        return;
    }

    var intro = introJs();

    options = extendObj(options, this.options);

    var me = this;
    intro.setOptions(options)
        .onafterchange(function(element) {
            me.step_showing++;
            me.saveLastVersionSeen();
        }).onexit(function() {
            console.log('exit');
            me.saveLastVersionSeen();
        }).oncomplete(function() {
            console.log('compete');
            me.complete = true;
            me.saveLastVersionSeen();
        }).start();
};
