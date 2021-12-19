import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input()
  category:Category;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  editCategory() {
this.router.navigate([this.category.id],
  {relativeTo:this.activatedRoute,state:this.category})
  }
}
