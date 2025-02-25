import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { Item } from '../../models/policy/policy.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-list',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss',
})
export class PolicyListComponent {
  items: Item[] = [];
  message: string = '';
  error: string = '';
  userRole: string = '';
  displayedColumns: string[] = [
    'policyNumber',
    'customerId',
    'policyType',
    'status',
    'actions',
  ];
  newPolicyNumber: string = '';
  newItemID: string = '';
  newItemType: string = '';
  newItemStatus: string = '';
  // Add variables for updating an item
  editItem: Item | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'admin';
    // this.userRole = localStorage.getItem('role') === 'admin' ? 'admin' : 'user';
    // console.log(' this.userRole', this.userRole);
    // this.decodeToken();
    // const user = this.authService.getUser();
    // this.userRole = user?.role || '';
    this.loadItems();
  }

  loadItems(): void {
    this.authService.getItems().subscribe({
      next: (res) => {
        this.message = res.message;
        this.items = res.data;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.error = err.error?.error || 'Failed to load items.';
      },
    });
  }
  // Enable edit mode
  startEditing(item: Item): void {
    this.editItem = { ...item }; // Create a copy of the item
    console.log('this.editItem', this.editItem);
  }

  // Save the updated item
  updateItem(): void {
    if (!this.editItem) return;

    this.authService.updateItem(this.editItem._id!, this.editItem).subscribe({
      next: (res) => {
        // Update the local items array
        const index = this.items.findIndex((i) => i._id === this.editItem?._id);
        if (index !== -1) {
          this.items[index] = res.data;
        }
        this.editItem = null; // Exit edit mode
      },
      error: (err) => {
        console.error('Error updating item:', err);
      },
    });
  }

  cancelEdit(): void {
    this.editItem = null;
  }

  // Delete an item (admin only)
  deleteItem(item: Item): void {
    if (!confirm('Are you sure you want to delete this item?')) return;
    this.authService.deleteItem(item._id!).subscribe({
      next: (res) => {
        this.items = this.items.filter((i) => i._id !== item._id);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      },
    });
  }
}
