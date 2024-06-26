import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import type {ApplicationConfig} from '@angular/core';
import {importProvidersFrom} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {MarkdownModule} from 'ngx-markdown';

import {ROUTES} from './app.routes';

export const config: ApplicationConfig = {
    providers: [
        provideAnimations(),
        importProvidersFrom(MarkdownModule.forRoot()),
        provideRouter(
            ROUTES,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
        ),
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: async () => import('highlight.js'),
                lineNumbersLoader: async () => import('ngx-highlightjs/line-numbers'),
            },
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        {
            provide: POSITION_OPTIONS,
            useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
        },
        NG_EVENT_PLUGINS,
    ],
};
