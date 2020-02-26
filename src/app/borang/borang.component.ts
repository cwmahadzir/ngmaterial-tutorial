import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soil } from '../jadual/soil';

@Component({
  selector: 'app-borang',
  templateUrl: './borang.component.html',
  styleUrls: ['./borang.component.css']
})
export class BorangComponent implements OnInit {
  ngOnInit(): void {
    this.soilForm.patchValue({
      id: this.data.id,
      description: this.data.description,
      symbol: this.data.symbol,
      category: this.data.category
    })
  }


  soilForm = this.fb.group({
    id: null,
    code: [null, Validators.required],
    description: [null, Validators.required],
    symbol: [null, Validators.required],
    category: [null, Validators.required],
  });


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BorangComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Soil) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.soilForm.value);
  }
}
