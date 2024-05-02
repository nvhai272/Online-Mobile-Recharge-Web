import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Servicees } from '../../../type';
import { Service } from '../../services/service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { feedbackService } from '../../services/feedBack';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  service: Servicees[] = [];
  serviceId?: number;
  constructor(private services: Service, private feedback: feedbackService) { }

  ServiceId!: number;
  Phone!: string;
  Content!: string
  getService(): void {
    this.services.getAll().subscribe({
      next: (data) => {
        this.service = data;
        console.log(data);
      },
      error: (e) => console.error('Error fetching recharge plan details:')
    });
  }
  ngOnInit(): void {

    this.getService();
  }
  add() {
    var inputdata = {
      ServiceId: this.ServiceId,
      Phone: this.Phone,
      Content: this.Content


    }
    this.feedback.create(inputdata).subscribe({
      next: (res: any) => {

        try {
          const response = JSON.parse(res);
          console.log(response);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Server response:', res);
        }
      },
      error: (error) => console.error('Error creating feedback:', error)
    });
  }

}
