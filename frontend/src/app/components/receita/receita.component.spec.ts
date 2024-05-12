import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaComponent } from './receita.component';

describe('ReceitasComponent', () => {
  let component: ReceitaComponent;
  let fixture: ComponentFixture<ReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
