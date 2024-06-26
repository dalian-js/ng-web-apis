import {Component, ViewChild} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';

import {providers} from '../src/constants/fallback';
import {WebAudioContext} from '../src/directives/audio-context';
import {WaWebAudio} from '../src/module';

describe('Listener', () => {
    describe('AudioListener', () => {
        @Component({
            template: `
                <div
                    forwardX="237"
                    forwardY="1"
                    forwardZ="2"
                    positionX="3"
                    positionY="4"
                    positionZ="5"
                    upX="6"
                    upY="7"
                    upZ="8"
                    waAudioContext
                >
                    <div waAudioDestinationNode></div>
                </div>
            `,
        })
        class Test {
            @ViewChild(WebAudioContext)
            public context!: AudioContext;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WaWebAudio],
                declarations: [Test],
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.context.listener instanceof AudioListener).toBe(true);
        });
    });

    describe('AudioListener factory fallback', () => {
        @Component({
            template: `
                <div
                    forwardX="237"
                    forwardY="1"
                    forwardZ="2"
                    positionX="3"
                    positionY="4"
                    positionZ="5"
                    upX="6"
                    upY="7"
                    upZ="8"
                    waAudioContext
                >
                    <div waAudioDestinationNode></div>
                </div>
            `,
        })
        class Test {
            @ViewChild(WebAudioContext)
            public context!: AudioContext;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WaWebAudio],
                declarations: [Test],
                providers,
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.context.listener instanceof AudioListener).toBe(true);
        });
    });
});
