import {NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {
    INTERSECTION_ROOT_MARGIN,
    INTERSECTION_THRESHOLD,
    WaIntersectionObserver,
    WaIntersectionObserverDirective,
} from '@ng-web-apis/intersection-observer';

window.onbeforeunload = jasmine.createSpy();

describe('WaIntersectionObservee', () => {
    @Component({
        standalone: true,
        imports: [NgIf, WaIntersectionObserver],
        template: `
            <div id="manual_observee">Hello</div>
            <section
                *ngIf="observe"
                #root
                id="observer_root"
                style="position: relative; height: 200px; overflow: auto;"
                waIntersectionObserver
                waIntersectionRoot
                waIntersectionThreshold="0.5"
            >
                <div style="height: 900px;">Height expander</div>
                <h1
                    style="position: absolute; top: 200px; height: 200px;"
                    (waIntersectionObservee)="onIntersection($event)"
                >
                    I'm being observed
                </h1>
                <h1
                    style="position: absolute; top: 200px; height: 200px;"
                    waIntersectionObserver
                    (waIntersectionObservee)="onIntersection($event)"
                >
                    Default values
                </h1>
            </section>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class Test {
        @ViewChild('root', {read: WaIntersectionObserverDirective})
        public observer!: WaIntersectionObserverDirective;

        // eslint-disable-next-line jest/no-jasmine-globals
        public onIntersection = jasmine.createSpy('onIntersection');
        public observe = true;
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
        testComponent.onIntersection.calls.reset();
    });

    it('emits intersections', (done) => {
        document.querySelector('#observer_root')!.scrollTop = 350;
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onIntersection).toHaveBeenCalled();

            document.querySelector('#observer_root')!.scrollTop = 0;
            fixture.detectChanges();
            testComponent.observe = false;
            fixture.detectChanges();
            done();
        }, 100);
    });

    it('compatible with native method signature', () => {
        expect(() =>
            testComponent.observer.observe(document.querySelector('#manual_observee')!),
        ).not.toThrow();
    });

    it('default options', () => {
        // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
        expect(TestBed.inject(INTERSECTION_ROOT_MARGIN)).toBe('0px 0px 0px 0px');
        expect(TestBed.inject(INTERSECTION_THRESHOLD)).toBe(0);
    });
});
