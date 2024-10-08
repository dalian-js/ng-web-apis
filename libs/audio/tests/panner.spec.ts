import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {providers, WaWebAudio, WebAudioPanner} from '@ng-web-apis/audio';

window.onbeforeunload = jasmine.createSpy();

describe('Panner', () => {
    describe('PannerNode', () => {
        @Component({
            standalone: true,
            imports: [WaWebAudio],
            template: `
                <div waPannerNode></div>
            `,
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class Test {
            @ViewChild(WebAudioPanner)
            public node!: AudioNode;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Test],
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.node instanceof PannerNode).toBe(true);
        });
    });

    describe('PannerNode factory fallback', () => {
        @Component({
            standalone: true,
            imports: [WaWebAudio],
            template: `
                <div waPannerNode></div>
            `,
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class Test {
            @ViewChild(WebAudioPanner)
            public node!: AudioNode;
        }

        let fixture: ComponentFixture<Test>;
        let testComponent: Test;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Test],
                providers,
            });

            fixture = TestBed.createComponent(Test);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.node instanceof PannerNode).toBe(true);
        });
    });
});
