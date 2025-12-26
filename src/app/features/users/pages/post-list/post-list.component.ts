import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Post} from '../../../../core/models/post.model';
import { User } from '../../../../core/models/user.model';

interface PostWithAuthor extends Post {
  authorName: string;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: PostWithAuthor[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res) => {
      const posts = res.posts || [];

      const userRequests = posts.map(post => this.userService.getUserById(post.userId));

      forkJoin(userRequests).subscribe((users: User[]) => {
        this.posts = posts.map((post, i) => ({
          ...post,
          authorName: `${users[i].firstName} ${users[i].lastName}`
        }));
      });
    });
  }
}
