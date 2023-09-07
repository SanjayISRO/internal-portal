import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { UsersObject } from '../../models/UserList';
import { FileSaverService } from '../../services/file-saver.service'

@Component({
  selector: 'app-connect-with-people',
  templateUrl: './connect-with-people.component.html',
  styleUrls: ['./connect-with-people.component.css']
})
export class ConnectWithPeopleComponent implements OnInit, OnChanges {

  @Input() connectUsersList: UsersObject[] = [];
  @Output() enrollNow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  searchBySkillSet: string = '';
  filteredResults: UsersObject[] = this.connectUsersList;

  constructor(
    private fileSaverService: FileSaverService,
    ) {}

  ngOnInit(): void {
    this.searchBySkillSet = '';
  }

  filterItem(modelValue: string): void {
    this.filteredResults = this.fileSaverService.getFilteredValues(this.connectUsersList, modelValue, 'connect');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredResults = changes['connectUsersList'].currentValue;
  }

  onClickEnrollNow(): void {
    this.enrollNow.emit('connect')
  }

  onClickDelete(rowItem: UsersObject): void {
    const obj = {
      category: 'connect',
      rowItem: rowItem
    }
    this.deleteRow.emit(obj);
  }
  onClickEdit(rowItem: UsersObject): void {
    this.editRow.emit(rowItem);
  }

}
