import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  providers: [UsersService],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class UsersComponent {
  users: any[] = [];
  paginatedUsers: any[] = [];
  searchTerm: string = '';
  selectedProfession: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  options = [
    { value: 'Analitičar', name: 'Analitičar' },
    { value: 'Inženjer', name: 'Inženjer' },
    { value: 'Konzultant', name: 'Konzultant' },
    { value: 'Dizajner', name: 'Dizajner' },
    { value: 'Manager', name: 'Manager' },
    { value: 'Programer', name: 'Programer' },
  ];

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data.data;
      this.filterUsers();
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    const professionTerm = this.selectedProfession.toLowerCase();

    this.users.forEach((user) => {
      const matchesSearchTerm =
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term);
      const matchesProfession =
        !professionTerm || user.jobTitle.toLowerCase().includes(professionTerm);

      user.isVisible = matchesSearchTerm && matchesProfession;
    });

    this.currentPage = 1; // Reset to the first page whenever we filter
    this.updatePagination();
  }

  updatePagination() {
    const visibleUsers = this.users.filter(user => user.isVisible);
    this.totalPages = Math.ceil(visibleUsers.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.paginatedUsers = visibleUsers.slice(startIndex, endIndex);
  }

  sortByName() {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.updatePagination();
  }

  sortByLastname() {
    this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.updatePagination();
  }

  sortByProfession() {
    this.users.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }
}
