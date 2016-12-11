import { TestBed } from '@angular/core/testing'
import { TopicListComponent } from './list'
import { ActivatedRoute, Router } from '@angular/router'
import { TopicService } from '../../../service/topic.service'

declare var describe, it, expect, beforeEach

describe('App', function () 
{
    beforeEach(function () {
        TestBed.configureTestingModule({ declarations: [TopicListComponent], providers: [ActivatedRoute]})
    })

    it('should work', function () {
        let fixture = TestBed.createComponent(TopicListComponent)

        expect(fixture.componentInstance instanceof TopicListComponent).toBe(true, 'should create AppComponent')
    })
})
