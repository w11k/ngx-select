# NgxSelect

Simple multiple select with filter.

##Installation
Use npm or yarn to install ``npm install --save @w11k/ngx-select`` or ``yarn add @w11k/ngx-select``

##Usage
Import NgxSelectModule into your AppModule and in your feature module import without ``forRoot()``
```typescript
@NgModule({ imports: [NgxSelectModule.forRoot()] })
export class AppModule { }

@NgModule({ imports: [NgxSelectModule] })
export class FeatureModule { }
```

##Customisation
You can provide different labes using the Angular dependency injection. 
Simply provide another implementation of ``DefaultNgxSelectIntlService``
```typescript
@Injectable()
export class NgxSelectCustomIntlService extends DefaultNgxSelectIntlService {

  allNoneSelect = 'Alle / Keine';
  filterPlaceholder = 'Filter';
  searchFieldPlaceholder = 'Suche';
  selected = 'ausgewählt';

  constructor() {
    super();
  }
}

@NgModule({ imports: [NgxSelectModule.forRoot({intlService: NgxSelectCustomIntlService})] })
export class AppModule { }
``` 
