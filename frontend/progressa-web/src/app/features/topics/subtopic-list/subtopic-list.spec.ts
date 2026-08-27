import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtopicList } from './subtopic-list';

describe('SubtopicList', () => {
  let component: SubtopicList;
  let fixture: ComponentFixture<SubtopicList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtopicList],
    }).compileComponents();

    fixture = TestBed.createComponent(SubtopicList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
