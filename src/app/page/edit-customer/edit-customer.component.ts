import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Customer } from 'src/app/model/customer';
import { CustomerService } from '../../service/customer.service';
import { MytoastrService } from 'src/app/service/mytoastr.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap( params => this.customerService.get(params.id) )
  );
 constructor(
  private customerService: CustomerService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private toaster: ToastrService,
  private mytoaster:MytoastrService,

  ) { }

  ngOnInit(): void {
  }

  updating:boolean=false;

  onUpdate(form: NgForm, customer: Customer): void {
    if(customer.id===0){
      this.customerService.create(customer)

    }else{
      this.updating=true,
      this.customerService.update(customer)
    }
    this.router.navigate(['customer'])

  }

  showSuccess(): void {
    this.mytoaster.showSuccess();
  }

  showError(): void {
    this.mytoaster.showError();
  }
}
