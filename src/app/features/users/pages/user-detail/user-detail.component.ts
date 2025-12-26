import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService} from '../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../services/user.service';
import { User } from '../../../../core/models/user.model';
import { Post } from '../../../../core/models/post.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
   imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user!: User;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');

    if (!userIdParam) {
      console.error('User ID manquant dans l’URL');
      return;
    }

    const userId = +userIdParam;
    if (isNaN(userId)) {
      console.error('User ID invalide:', userIdParam);
      return;
    }

    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });

    this.postService.getPostsByUser(userId).subscribe((res) => {
      this.posts = res.posts || [];
    });
  }

}
