import {Component, ViewChild} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';

import {WaWebAudio} from '../src/module';
import {WebAudioIIRFilter} from '../src/nodes/iir-filter';
import {CONSTRUCTOR_SUPPORT} from '../src/tokens/constructor-support';
import {FEEDBACK_COEFFICIENTS} from '../src/tokens/feedback-coefficients';
import {FEEDFORWARD_COEFFICIENTS} from '../src/tokens/feedforward-coefficients';

describe('IIR filter', () => {
    describe('IIRFilterNode', () => {
        @Component({
            template: `
                <div waIIRFilterNode></div>
            `,
        })
        class Test {
            @ViewChild(WebAudioIIRFilter)
            public node!: AudioNode;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WaWebAudio],
                declarations: [Test],
                providers: [
                    {
                        provide: FEEDFORWARD_COEFFICIENTS,
                        useValue: [1],
                    },
                    {
                        provide: FEEDBACK_COEFFICIENTS,
                        useValue: [1],
                    },
                ],
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.node instanceof IIRFilterNode).toBe(true);
        });
    });

    describe('IIRFilterNode factory fallback', () => {
        @Component({
            template: `
                <div waIIRFilterNode></div>
            `,
        })
        class Test {
            @ViewChild(WebAudioIIRFilter)
            public node!: AudioNode;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WaWebAudio],
                declarations: [Test],
                providers: [
                    {
                        provide: FEEDFORWARD_COEFFICIENTS,
                        useValue: [1],
                    },
                    {
                        provide: FEEDBACK_COEFFICIENTS,
                        useValue: [1],
                    },
                    {
                        provide: CONSTRUCTOR_SUPPORT,
                        useValue: false,
                    },
                ],
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.node instanceof IIRFilterNode).toBe(true);
        });
    });
});
